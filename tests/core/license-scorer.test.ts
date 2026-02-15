import { describe, expect, it } from "bun:test";

import { getTopLicenses, scoreLicenses } from "@/core/license-scorer";
import type { WizardAnswer } from "@/types/wizard";

const PERMISSIVE_USER: WizardAnswer = {
	projectType: "library",
	commercialUse: true,
	copyleft: "none",
	patentProtection: false,
};

const COPYLEFT_USER: WizardAnswer = {
	projectType: "library",
	commercialUse: true,
	copyleft: "strong",
	patentProtection: true,
};

const DOCS_USER: WizardAnswer = {
	projectType: "documentation",
	commercialUse: true,
	copyleft: "none",
	patentProtection: false,
};

describe("scoreLicenses", () => {
	it("should return exactly 14 entries", () => {
		expect(scoreLicenses(PERMISSIVE_USER)).toHaveLength(14);
	});

	it("should return results sorted by score descending", () => {
		const results = scoreLicenses(PERMISSIVE_USER);
		for (let i = 1; i < results.length; i++) {
			expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
		}
	});

	it("should have all scores as numbers (no NaN)", () => {
		const results = scoreLicenses(PERMISSIVE_USER);
		for (const entry of results) {
			expect(Number.isNaN(entry.score)).toBe(false);
		}
	});

	it("should give MIT the highest score for a permissive-leaning user", () => {
		const results = scoreLicenses(PERMISSIVE_USER);
		const mitScore = results.find((r) => r.spdxId === "MIT")?.score;
		const topScore = results[0].score;
		expect(mitScore).toBe(topScore);
	});

	it("should rank GPL-3.0 in top 3 for a copyleft-leaning user", () => {
		const top3 = scoreLicenses(COPYLEFT_USER).slice(0, 3);
		expect(top3.map((r) => r.spdxId)).toContain("GPL-3.0");
	});

	it("should rank CC0-1.0 in top 3 for a documentation project", () => {
		const top3 = scoreLicenses(DOCS_USER).slice(0, 3);
		expect(top3.map((r) => r.spdxId)).toContain("CC0-1.0");
	});
});

describe("getTopLicenses", () => {
	it("should return 3 results by default", () => {
		expect(getTopLicenses(PERMISSIVE_USER)).toHaveLength(3);
	});

	it("should return at most the specified limit", () => {
		expect(getTopLicenses(PERMISSIVE_USER, 5)).toHaveLength(5);
		expect(getTopLicenses(PERMISSIVE_USER, 1)).toHaveLength(1);
	});

	it("should return LicenseMetadata objects with spdxId and name", () => {
		const results = getTopLicenses(PERMISSIVE_USER);
		for (const license of results) {
			expect(typeof license.spdxId).toBe("string");
			expect(typeof license.name).toBe("string");
			expect(typeof license.body).toBe("string");
		}
	});
});
