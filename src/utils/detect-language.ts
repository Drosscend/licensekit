import type { SupportedLanguage } from "@/types/cli";

const SUPPORTED_LANGUAGES: ReadonlySet<string> = new Set(["en", "fr"]);

const ENV_KEYS = ["LANG", "LC_ALL", "LC_MESSAGES", "LANGUAGE"] as const;

/**
 * Type guard that checks whether a string is a supported language code.
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
	return SUPPORTED_LANGUAGES.has(lang);
}

/**
 * Extracts the two-letter language code from a locale string.
 * For example, "fr_FR.UTF-8" returns "fr", "en_US" returns "en".
 * Returns null if the input is empty or undefined.
 */
function extractLanguageCode(locale: string | undefined): string | null {
	if (!locale) {
		return null;
	}

	const match = locale.match(/^([a-z]{2})/i);
	return match ? match[1].toLowerCase() : null;
}

/**
 * Detects the system language by inspecting environment variables.
 * Checks LANG, LC_ALL, LC_MESSAGES, and LANGUAGE in order.
 * Returns "fr" if the detected language is French, "en" otherwise.
 */
export function detectLanguage(): SupportedLanguage {
	for (const key of ENV_KEYS) {
		const code = extractLanguageCode(Bun.env[key]);

		if (code !== null && isSupportedLanguage(code)) {
			return code;
		}
	}

	return "en";
}
