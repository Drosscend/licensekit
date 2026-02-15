import pc from "picocolors";

import { getAllLicenses } from "@/core/license-resolver";
import { t } from "@/i18n/index";
import type { SupportedLanguage } from "@/types/cli";
import type { LicenseCategory, LicenseMetadata } from "@/types/license";
import { detectLanguage } from "@/utils/detect-language";
import { formatCategory } from "@/utils/format";
import { printLogo } from "@/utils/logo";

const CATEGORY_ORDER: LicenseCategory[] = [
	"permissive",
	"copyleft",
	"weak-copyleft",
	"public-domain",
];

/** Lists all available licenses grouped by category. */
export function runList(lang?: SupportedLanguage): void {
	const resolvedLang = lang ?? detectLanguage();
	const translations = t(resolvedLang);

	printLogo(resolvedLang);

	const licenses = getAllLicenses();
	const grouped = new Map<LicenseCategory, LicenseMetadata[]>();

	for (const license of licenses) {
		const group = grouped.get(license.category) ?? [];
		group.push(license);
		grouped.set(license.category, group);
	}

	for (const category of CATEGORY_ORDER) {
		const group = grouped.get(category);
		if (!group || group.length === 0) {
			continue;
		}

		const categoryLabel =
			translations.license.category[
				category === "weak-copyleft"
					? "weakCopyleft"
					: category === "public-domain"
						? "publicDomain"
						: category
			];

		console.log(formatCategory(category) + pc.bold(` -- ${categoryLabel}`));

		for (const license of group) {
			console.log(`${pc.dim(`  ${license.spdxId}`)} -- ${license.name}`);
		}
		console.log();
	}
}
