import pc from "picocolors";

import { resolveLicense } from "@/core/license-resolver";
import {
	buildRules,
	CONDITION_TAGS,
	LIMITATION_TAGS,
	PERMISSION_TAGS,
	resolveTagKey,
} from "@/data/rules";
import { t } from "@/i18n/index";
import type { SupportedLanguage } from "@/types/cli";
import type { LicenseMetadata } from "@/types/license";
import { detectLanguage } from "@/utils/detect-language";
import { formatSectionTitle } from "@/utils/format";
import { printLogo } from "@/utils/logo";

function hasTag(
	license: LicenseMetadata,
	tag: string,
	kind: "permissions" | "conditions" | "limitations",
): boolean {
	const target = resolveTagKey(tag);
	return license[kind].some((owned) => resolveTagKey(owned) === target);
}

function compareRow(label: string, aHas: boolean, bHas: boolean, marker: string): string {
	const colA = aHas ? pc.green(marker) : pc.dim("[ ]");
	const colB = bHas ? pc.green(marker) : pc.dim("[ ]");
	return `  ${colA}  ${colB}  ${label}`;
}

/** Compares two licenses side by side. */
export function runCompare(queryA: string, queryB: string, lang?: SupportedLanguage): void {
	const resolvedLang = lang ?? detectLanguage();
	const translations = t(resolvedLang);

	const licenseA = resolveLicense(queryA);
	const licenseB = resolveLicense(queryB);

	if (!licenseA) {
		console.error(pc.red(`${translations.errors.licenseNotFound}: ${queryA}`));
		process.exit(1);
	}

	if (!licenseB) {
		console.error(pc.red(`${translations.errors.licenseNotFound}: ${queryB}`));
		process.exit(1);
	}

	printLogo(resolvedLang);

	const rules = buildRules(translations);

	// Header
	const headerA = pc.bold(licenseA.name);
	const headerB = pc.bold(licenseB.name);
	console.log(`  ${headerA}  vs  ${headerB}`);
	console.log();

	// Permissions
	console.log(formatSectionTitle(translations.license.permissions));
	for (const tag of PERMISSION_TAGS) {
		const rule = rules.permissions.find((r) => r.tag === tag);
		const label = rule ? rule.label : tag;
		const aHas = hasTag(licenseA, tag, "permissions");
		const bHas = hasTag(licenseB, tag, "permissions");
		console.log(compareRow(label, aHas, bHas, "[+]"));
	}
	console.log();

	// Conditions
	console.log(formatSectionTitle(translations.license.conditions));
	for (const tag of CONDITION_TAGS) {
		const rule = rules.conditions.find((r) => r.tag === tag);
		const label = rule ? rule.label : tag;
		const aHas = hasTag(licenseA, tag, "conditions");
		const bHas = hasTag(licenseB, tag, "conditions");
		console.log(compareRow(label, aHas, bHas, "[i]"));
	}
	console.log();

	// Limitations
	console.log(formatSectionTitle(translations.license.limitations));
	for (const tag of LIMITATION_TAGS) {
		const rule = rules.limitations.find((r) => r.tag === tag);
		const label = rule ? rule.label : tag;
		const aHas = hasTag(licenseA, tag, "limitations");
		const bHas = hasTag(licenseB, tag, "limitations");
		console.log(compareRow(label, aHas, bHas, "[!]"));
	}
}
