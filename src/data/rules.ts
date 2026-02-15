import type { TranslationKeys } from "@/i18n/keys";
import type { LicenseRule, LicenseRuleSet } from "@/types/license";

/** All known permission tags. */
export const PERMISSION_TAGS = [
	"commercial-use",
	"modifications",
	"distribution",
	"patent-use",
	"private-use",
] as const;

/** All known condition tags. */
export const CONDITION_TAGS = [
	"include-copyright",
	"document-changes",
	"same-license",
	"network-use-is-distribution",
] as const;

/** All known limitation tags. */
export const LIMITATION_TAGS = [
	"no-liability",
	"no-warranty",
	"trademark-use",
	"no-patent-use",
] as const;

export type PermissionTag = (typeof PERMISSION_TAGS)[number];
export type ConditionTag = (typeof CONDITION_TAGS)[number];
export type LimitationTag = (typeof LIMITATION_TAGS)[number];

// Maps kebab-case tags to camelCase i18n keys in TranslationKeys["rules"].
// Includes aliases for variant tags used by the GitHub Licenses API.
const TAG_TO_I18N_KEY: Record<string, keyof TranslationKeys["rules"]> = {
	"commercial-use": "commercialUse",
	modifications: "modifications",
	distribution: "distribution",
	"patent-use": "patentUse",
	"private-use": "privateUse",
	"include-copyright": "includeCopyright",
	"include-copyright--source": "includeCopyright",
	"document-changes": "documentChanges",
	"same-license": "sameLicense",
	"same-license--file": "sameLicense",
	"same-license--library": "sameLicense",
	"disclose-source": "sameLicense",
	"network-use-is-distribution": "networkUseIsDistribution",
	"network-use-disclose": "networkUseIsDistribution",
	"no-liability": "noLiability",
	liability: "noLiability",
	"no-warranty": "noWarranty",
	warranty: "noWarranty",
	"trademark-use": "trademarkUse",
	"no-patent-use": "noPatentUse",
};

function buildRulesFromTags(tags: readonly string[], translations: TranslationKeys): LicenseRule[] {
	return tags.map((tag) => {
		const key = TAG_TO_I18N_KEY[tag];
		if (!key) {
			return { tag, label: tag, description: "" };
		}
		const rule = translations.rules[key];
		return { tag, label: rule.label, description: rule.description };
	});
}

/** Builds the full rule set with labels and descriptions from translations. */
export function buildRules(translations: TranslationKeys): LicenseRuleSet {
	return {
		permissions: buildRulesFromTags(PERMISSION_TAGS, translations),
		conditions: buildRulesFromTags(CONDITION_TAGS, translations),
		limitations: buildRulesFromTags(LIMITATION_TAGS, translations),
	};
}

/** Resolves a tag (including API aliases) to its translated label. Returns the raw tag if unknown. */
export function resolveTagLabel(tag: string, translations: TranslationKeys): string {
	const key = TAG_TO_I18N_KEY[tag];
	if (!key) {
		return tag;
	}
	return translations.rules[key].label;
}
