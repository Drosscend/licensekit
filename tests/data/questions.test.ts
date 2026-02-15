import { describe, expect, it } from "bun:test";

import { LICENSE_KEYS } from "@/data/licenses/index";
import { SCORING_MATRIX } from "@/data/questions";

const EXPECTED_KEYS = ["projectType", "commercialUse", "copyleft", "patentProtection"];

describe("SCORING_MATRIX", () => {
	it("should have exactly 4 entries", () => {
		expect(SCORING_MATRIX).toHaveLength(4);
	});

	it("should have keys matching WizardAnswer fields", () => {
		const keys = SCORING_MATRIX.map((q) => q.key);
		expect(keys).toEqual(EXPECTED_KEYS);
	});

	it("should only reference spdxIds that exist in LICENSE_KEYS", () => {
		for (const question of SCORING_MATRIX) {
			for (const [, modifiers] of Object.entries(question.answers)) {
				for (const modifier of modifiers) {
					expect(LICENSE_KEYS).toContain(modifier.spdxId);
				}
			}
		}
	});

	it("should not duplicate spdxIds within a single answer", () => {
		for (const question of SCORING_MATRIX) {
			for (const [, modifiers] of Object.entries(question.answers)) {
				const ids = modifiers.map((m) => m.spdxId);
				const unique = new Set(ids);
				expect(ids.length).toBe(unique.size);
			}
		}
	});
});
