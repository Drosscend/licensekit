import { describe, expect, it } from "bun:test";

import { getTranslations, t } from "@/i18n/index";

// Recursively collects all leaf keys as dot-separated paths
function collectKeys(obj: Record<string, unknown>, prefix = ""): string[] {
	const keys: string[] = [];
	for (const key of Object.keys(obj)) {
		const path = prefix ? `${prefix}.${key}` : key;
		const value = obj[key];
		if (typeof value === "object" && value !== null) {
			keys.push(...collectKeys(value as Record<string, unknown>, path));
		} else {
			keys.push(path);
		}
	}
	return keys.sort();
}

// Recursively collects all leaf string values
function collectValues(obj: Record<string, unknown>): string[] {
	const values: string[] = [];
	for (const value of Object.values(obj)) {
		if (typeof value === "string") {
			values.push(value);
		} else if (typeof value === "object" && value !== null) {
			values.push(...collectValues(value as Record<string, unknown>));
		}
	}
	return values;
}

describe("i18n", () => {
	it("should have identical key structures for en and fr", () => {
		const enKeys = collectKeys(getTranslations("en") as unknown as Record<string, unknown>);
		const frKeys = collectKeys(getTranslations("fr") as unknown as Record<string, unknown>);
		expect(enKeys).toEqual(frKeys);
	});

	it("should have no empty string values in en", () => {
		const values = collectValues(getTranslations("en") as unknown as Record<string, unknown>);
		for (const value of values) {
			expect(value.length).toBeGreaterThan(0);
		}
	});

	it("should have no empty string values in fr", () => {
		const values = collectValues(getTranslations("fr") as unknown as Record<string, unknown>);
		for (const value of values) {
			expect(value.length).toBeGreaterThan(0);
		}
	});

	it("should expose t as an alias for getTranslations", () => {
		expect(t).toBe(getTranslations);
	});
});
