import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import type { TranslationKeys } from "@/i18n/keys";
import type { SupportedLanguage } from "@/types/cli";

const translations: Record<SupportedLanguage, TranslationKeys> = { en, fr };

/** Returns the translation object for the given language. */
export function getTranslations(lang: SupportedLanguage): TranslationKeys {
	return translations[lang];
}

/** Shorthand alias for getTranslations. */
export const t: typeof getTranslations = getTranslations;
