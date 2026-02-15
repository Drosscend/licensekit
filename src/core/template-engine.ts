import type { LicensePlaceholders } from "@/types/license";

const PLACEHOLDER_REGEX = /\[(\w+)\]/g;

const PLACEHOLDER_MAP: Record<keyof LicensePlaceholders, string> = {
	year: "[year]",
	fullname: "[fullname]",
};

/**
 * Replaces [year] and [fullname] placeholders in a license body.
 * Unknown placeholders are left untouched.
 */
export function fillPlaceholders(body: string, placeholders: LicensePlaceholders): string {
	let result = body;

	for (const [key, token] of Object.entries(PLACEHOLDER_MAP)) {
		const value = placeholders[key as keyof LicensePlaceholders];
		if (value) {
			result = result.replaceAll(token, value);
		}
	}

	return result;
}

/**
 * Scans the body and returns an array of all placeholder names found.
 * For example, "[year]" and "[fullname]" returns ["year", "fullname"].
 */
export function detectPlaceholders(body: string): string[] {
	const matches = new Set<string>();

	for (const match of body.matchAll(PLACEHOLDER_REGEX)) {
		if (match[1]) {
			matches.add(match[1]);
		}
	}

	return [...matches];
}

/** Returns true if the body contains at least one [placeholder]. */
export function hasPlaceholders(body: string): boolean {
	return PLACEHOLDER_REGEX.test(body);
}
