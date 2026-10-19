import { describe, expect, it } from "bun:test";

import { LICENSES } from "@/data/licenses/index";
import {
	buildRules,
	CONDITION_TAGS,
	LIMITATION_TAGS,
	PERMISSION_TAGS,
	resolveTagKey,
} from "@/data/rules";
import { getTranslations } from "@/i18n/index";
import type { RuleKind } from "@/types/license";

describe("rule tags", () => {
	it("should include commercial-use in PERMISSION_TAGS", () => {
		expect(PERMISSION_TAGS).toContain("commercial-use");
	});

	it("should include include-copyright in CONDITION_TAGS", () => {
		expect(CONDITION_TAGS).toContain("include-copyright");
	});

	it("should include no-liability in LIMITATION_TAGS", () => {
		expect(LIMITATION_TAGS).toContain("no-liability");
	});
});

describe("buildRules", () => {
	const rules = buildRules(getTranslations("en"));

	it("should return permissions, conditions, and limitations arrays", () => {
		expect(Array.isArray(rules.permissions)).toBe(true);
		expect(Array.isArray(rules.conditions)).toBe(true);
		expect(Array.isArray(rules.limitations)).toBe(true);
	});

	it("should have the same number of permissions as PERMISSION_TAGS", () => {
		expect(rules.permissions.length).toBe(PERMISSION_TAGS.length);
	});

	it("should have the same number of conditions as CONDITION_TAGS", () => {
		expect(rules.conditions.length).toBe(CONDITION_TAGS.length);
	});

	it("should have the same number of limitations as LIMITATION_TAGS", () => {
		expect(rules.limitations.length).toBe(LIMITATION_TAGS.length);
	});

	it("should produce rules with non-empty tag, label, and description", () => {
		const allRules = [...rules.permissions, ...rules.conditions, ...rules.limitations];
		for (const rule of allRules) {
			expect(rule.tag.length).toBeGreaterThan(0);
			expect(rule.label.length).toBeGreaterThan(0);
			expect(rule.description.length).toBeGreaterThan(0);
		}
	});
});

describe("resolveTagKey", () => {
	it("should resolve the patent-use limitation to the no-patent-use rule", () => {
		expect(resolveTagKey("patent-use", "limitations")).toBe(
			resolveTagKey("no-patent-use", "limitations"),
		);
	});

	it("should keep the patent-use permission as a permission", () => {
		expect(resolveTagKey("patent-use", "permissions")).toBe("patentUse");
	});

	it("should resolve every bundled license tag to a rule of its own kind", () => {
		const canonicalTags: Record<RuleKind, readonly string[]> = {
			permissions: PERMISSION_TAGS,
			conditions: CONDITION_TAGS,
			limitations: LIMITATION_TAGS,
		};

		for (const kind of Object.keys(canonicalTags) as RuleKind[]) {
			const knownKeys = canonicalTags[kind].map((tag) => resolveTagKey(tag, kind));
			for (const license of LICENSES) {
				for (const tag of license[kind]) {
					expect(knownKeys).toContain(resolveTagKey(tag, kind));
				}
			}
		}
	});
});
