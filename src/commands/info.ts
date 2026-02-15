import pc from "picocolors";

import { resolveLicense } from "@/core/license-resolver";
import { resolveTagLabel } from "@/data/rules";
import { t } from "@/i18n/index";
import type { SupportedLanguage } from "@/types/cli";
import { detectLanguage } from "@/utils/detect-language";
import {
	formatCategory,
	formatCondition,
	formatLimitation,
	formatPermission,
	formatSectionTitle,
} from "@/utils/format";
import { printLogo } from "@/utils/logo";

/** Shows detailed information about a specific license. */
export function runInfo(query: string, lang?: SupportedLanguage): void {
	const resolvedLang = lang ?? detectLanguage();
	const translations = t(resolvedLang);

	const license = resolveLicense(query);

	if (!license) {
		console.error(pc.red(translations.errors.licenseNotFound));
		process.exit(1);
	}

	printLogo(resolvedLang);

	console.log(pc.bold(license.name) + pc.dim(` (${license.spdxId})`));
	console.log(formatCategory(license.category));
	console.log();
	console.log(pc.dim(license.description));
	console.log();

	// Permissions
	console.log(formatSectionTitle(translations.license.permissions));
	for (const tag of license.permissions) {
		console.log(formatPermission(resolveTagLabel(tag, translations)));
	}
	console.log();

	// Conditions
	console.log(formatSectionTitle(translations.license.conditions));
	if (license.conditions.length === 0) {
		console.log(pc.dim("  (none)"));
	} else {
		for (const tag of license.conditions) {
			console.log(formatCondition(resolveTagLabel(tag, translations)));
		}
	}
	console.log();

	// Limitations
	console.log(formatSectionTitle(translations.license.limitations));
	for (const tag of license.limitations) {
		console.log(formatLimitation(resolveTagLabel(tag, translations)));
	}
}
