import pc from "picocolors";

import type { LicenseCategory } from "@/types/license";

/** Formats a permission entry with a green [+] prefix. */
export function formatPermission(text: string): string {
	return pc.green(`[+] ${text}`);
}

/** Formats a condition entry with a yellow [i] prefix. */
export function formatCondition(text: string): string {
	return pc.yellow(`[i] ${text}`);
}

/** Formats a limitation entry with a red [!] prefix. */
export function formatLimitation(text: string): string {
	return pc.red(`[!] ${text}`);
}

const CATEGORY_COLORS: Record<LicenseCategory, (text: string) => string> = {
	permissive: pc.green,
	copyleft: pc.red,
	"weak-copyleft": pc.yellow,
	"public-domain": pc.blue,
};

/** Formats a license category label with its associated color. */
export function formatCategory(category: LicenseCategory): string {
	return CATEGORY_COLORS[category](category);
}

/** Formats text as a bold section title. */
export function formatSectionTitle(text: string): string {
	return pc.bold(text);
}

/** Formats text as dimmed secondary information. */
export function formatDim(text: string): string {
	return pc.dim(text);
}
