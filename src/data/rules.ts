import type { TranslationKeys } from "@/i18n/keys";
import type { LicenseRule, LicenseRuleSet, RuleKind } from "@/types/license";

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

// The GitHub Licenses API lists `patent-use` under limitations too, where it
// means the license grants no patent rights.
const LIMITATION_TAG_TO_I18N_KEY: Record<string, keyof TranslationKeys["rules"]> = {
	"patent-use": "noPatentUse",
};

function i18nKeyOf(tag: string, kind: RuleKind): keyof TranslationKeys["rules"] | undefined {
	if (kind === "limitations") {
		return LIMITATION_TAG_TO_I18N_KEY[tag] ?? TAG_TO_I18N_KEY[tag];
	}
	return TAG_TO_I18N_KEY[tag];
}

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

/**
 * Normalizes a tag of the given kind to the i18n key it maps to, so that tags
 * coming from the GitHub API (`liability`, `warranty`, ...) match the canonical
 * ones declared above (`no-liability`, `no-warranty`, ...). Returns the raw tag
 * when unknown.
 */
export function resolveTagKey(tag: string, kind: RuleKind): string {
	return i18nKeyOf(tag, kind) ?? tag;
}

/**
 * Resolves a tag of the given kind (including API aliases) to its translated
 * label. Returns the raw tag if unknown.
 */
export function resolveTagLabel(
	tag: string,
	kind: RuleKind,
	translations: TranslationKeys,
): string {
	const key = i18nKeyOf(tag, kind);
	if (!key) {
		return tag;
	}
	return translations.rules[key].label;
}
