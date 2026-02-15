/** Supported languages for license descriptions. */
export type SupportedLanguage = "en" | "fr";

/** Git user information extracted from git config. */
export type GitUserInfo = {
	name: string | null;
	email: string | null;
};
