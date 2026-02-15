import * as clack from "@clack/prompts";
import pc from "picocolors";
import { getDefaultOutputPath, licenseFileExists, writeLicenseFile } from "@/core/file-writer";
import { getTopLicenses } from "@/core/license-scorer";
import { detectManifests, getAdapter } from "@/core/manifest/index";
import { fillPlaceholders } from "@/core/template-engine";
import { resolveTagLabel } from "@/data/rules";
import { interpolate, t } from "@/i18n/index";
import type { SupportedLanguage } from "@/types/cli";
import type { LicenseMetadata } from "@/types/license";
import type { WizardAnswer } from "@/types/wizard";
import { detectLanguage } from "@/utils/detect-language";
import {
	formatCategory,
	formatCondition,
	formatLimitation,
	formatPermission,
	formatSectionTitle,
	stripHtmlTags,
} from "@/utils/format";
import { getGitUserName } from "@/utils/git";
import { printLogo } from "@/utils/logo";

/** Options that can be pre-filled from CLI flags. */
export type WizardOptions = {
	author?: string;
	year?: string;
	output?: string;
	lang?: SupportedLanguage;
};

function handleCancel(value: unknown): void {
	if (clack.isCancel(value)) {
		clack.cancel("Operation cancelled.");
		process.exit(0);
	}
}

function formatLicenseDetails(
	license: LicenseMetadata,
	translations: ReturnType<typeof t>,
): string {
	const lines: string[] = [];

	lines.push(`${pc.bold(license.name)} ${pc.dim(`(${license.spdxId})`)}`);
	lines.push(formatCategory(license.category));
	lines.push("");
	lines.push(pc.dim(stripHtmlTags(license.description)));
	lines.push("");

	if (license.permissions.length > 0) {
		lines.push(formatSectionTitle(translations.license.permissions));
		for (const tag of license.permissions) {
			lines.push(formatPermission(resolveTagLabel(tag, translations)));
		}
	}

	if (license.conditions.length > 0) {
		lines.push(formatSectionTitle(translations.license.conditions));
		for (const tag of license.conditions) {
			lines.push(formatCondition(resolveTagLabel(tag, translations)));
		}
	}

	if (license.limitations.length > 0) {
		lines.push(formatSectionTitle(translations.license.limitations));
		for (const tag of license.limitations) {
			lines.push(formatLimitation(resolveTagLabel(tag, translations)));
		}
	}

	return lines.join("\n");
}

/** Runs the interactive wizard flow to choose and generate a LICENSE file. */
export async function runWizard(options: WizardOptions = {}): Promise<void> {
	const lang = options.lang ?? detectLanguage();
	const translations = t(lang);

	printLogo(lang);
	clack.intro(pc.bold(translations.cli.title));

	try {
		// Question 1: Project type
		const projectType = await clack.select({
			message: translations.wizard.projectType.question,
			options: [
				{ value: "library" as const, label: translations.wizard.projectType.library },
				{ value: "personal" as const, label: translations.wizard.projectType.personal },
				{ value: "commercial" as const, label: translations.wizard.projectType.commercial },
				{
					value: "documentation" as const,
					label: translations.wizard.projectType.documentation,
				},
			],
		});
		handleCancel(projectType);

		// Question 2: Commercial use
		const commercialUse = await clack.select({
			message: translations.wizard.commercialUse.question,
			options: [
				{ value: true, label: translations.wizard.commercialUse.yes },
				{ value: false, label: translations.wizard.commercialUse.no },
			],
		});
		handleCancel(commercialUse);

		// Question 3: Copyleft
		const copyleft = await clack.select({
			message: translations.wizard.copyleft.question,
			options: [
				{ value: "none" as const, label: translations.wizard.copyleft.none },
				{ value: "strong" as const, label: translations.wizard.copyleft.strong },
				{ value: "weak" as const, label: translations.wizard.copyleft.weak },
			],
		});
		handleCancel(copyleft);

		// Question 4: Patent protection
		const patentProtection = await clack.select({
			message: translations.wizard.patentProtection.question,
			options: [
				{ value: true, label: translations.wizard.patentProtection.yes },
				{ value: false, label: translations.wizard.patentProtection.no },
			],
		});
		handleCancel(patentProtection);

		// Score and recommend
		const answers: WizardAnswer = {
			projectType: projectType as WizardAnswer["projectType"],
			commercialUse: commercialUse as boolean,
			copyleft: copyleft as WizardAnswer["copyleft"],
			patentProtection: patentProtection as boolean,
		};

		const recommended = getTopLicenses(answers, 5);

		// Display results
		clack.log.info(formatSectionTitle(translations.wizard.results.title));

		for (let i = 0; i < recommended.length; i++) {
			const license = recommended[i];
			const prefix = i === 0 ? `${translations.wizard.results.recommended}` : "";
			clack.note(formatLicenseDetails(license, translations), prefix);
		}

		// Select license
		const selectedSpdxId = await clack.select({
			message: translations.wizard.results.select,
			options: recommended.map((l) => ({
				value: l.spdxId,
				label: l.name,
				hint: stripHtmlTags(l.description).slice(0, 80),
			})),
		});
		handleCancel(selectedSpdxId);

		const selectedLicense = recommended.find((l) => l.spdxId === selectedSpdxId) as LicenseMetadata;

		// Author name
		let authorName = options.author;
		if (!authorName) {
			const gitName = getGitUserName();
			const authorInput = await clack.text({
				message: gitName
					? `${translations.wizard.author.question} ${pc.dim(translations.wizard.author.detected)}`
					: translations.wizard.author.question,
				initialValue: gitName ?? undefined,
				validate(value) {
					if (!value || value.trim().length === 0) {
						return "Author name is required.";
					}
				},
			});
			handleCancel(authorInput);
			authorName = authorInput as string;
		}

		// Year
		let year = options.year;
		if (!year) {
			const currentYear = new Date().getFullYear().toString();
			const yearInput = await clack.text({
				message: translations.wizard.year.question,
				initialValue: currentYear,
				validate(value) {
					if (!/^\d{4}$/.test(value)) {
						return "Year must be a 4-digit number.";
					}
				},
			});
			handleCancel(yearInput);
			year = yearInput as string;
		}

		// Output path
		const outputPath = options.output ?? getDefaultOutputPath();

		// Check existing file
		const exists = await licenseFileExists(outputPath);
		if (exists) {
			const overwrite = await clack.confirm({
				message: translations.wizard.confirm.overwrite,
			});
			handleCancel(overwrite);

			if (!overwrite) {
				clack.cancel("Operation cancelled.");
				process.exit(0);
			}
		}

		// Generate and write
		const finalText = fillPlaceholders(selectedLicense.body, {
			year: year,
			fullname: authorName,
		});

		await writeLicenseFile(finalText, outputPath);

		// Manifest detection and update
		const manifests = await detectManifests(process.cwd());

		for (const manifest of manifests) {
			const values = {
				ecosystem: manifest.ecosystem,
				filePath: manifest.filePath,
				spdxId: selectedLicense.spdxId,
			};

			if (manifest.currentLicense === selectedLicense.spdxId) {
				clack.log.info(interpolate(translations.manifest.alreadySet, values));
				continue;
			}

			const shouldUpdate = await clack.confirm({
				message: interpolate(translations.manifest.promptUpdate, values),
			});
			handleCancel(shouldUpdate);

			if (shouldUpdate) {
				const adapter = getAdapter(manifest.ecosystem);
				if (adapter) {
					const success = await adapter.update(manifest.filePath, selectedLicense.spdxId);
					if (success) {
						clack.log.success(interpolate(translations.manifest.updated, values));
					} else {
						clack.log.error(interpolate(translations.manifest.updateError, values));
					}
				}
			}
		}

		clack.outro(translations.wizard.done);
	} catch (error) {
		clack.log.error(error instanceof Error ? error.message : translations.errors.writeError);
		process.exit(1);
	}
}
