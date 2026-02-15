import pc from "picocolors";

import { t } from "@/i18n/index";
import type { SupportedLanguage } from "@/types/cli";

/** ASCII art logo for the CLI banner. */
export const LOGO = `
  _     _                         _  ___ _
 | |   (_) ___ ___ _ __  ___  ___| |/ (_) |_
 | |   | |/ __/ _ \\ '_ \\/ __|/ _ \\ ' /| | __|
 | |___| | (_|  __/ | | \\__ \\  __/ . \\| | |_
 |_____|_|\\___\\___|_| |_|___/\\___|_|\\_\\_|\\__|
`;

/** Prints the logo in cyan, the tagline in dim, and the version. */
export function printLogo(lang: SupportedLanguage): void {
	const translations = t(lang);
	console.log(pc.cyan(LOGO));
	console.log(pc.dim(translations.cli.tagline));
	console.log(pc.dim(`v0.1.0`));
	console.log();
}
