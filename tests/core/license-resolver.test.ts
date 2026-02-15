import { describe, expect, it } from "bun:test";

import {
	getAllLicenses,
	getLicensesByCategory,
	resolveLicense,
	searchLicenses,
} from "@/core/license-resolver";

describe("resolveLicense", () => {
	it("should resolve MIT by exact spdxId", () => {
		const license = resolveLicense("MIT");
		expect(license?.spdxId).toBe("MIT");
	});

	it("should resolve mit case-insensitively", () => {
		const license = resolveLicense("mit");
		expect(license?.spdxId).toBe("MIT");
	});

	it("should resolve by exact name", () => {
		const license = resolveLicense("MIT License");
		expect(license?.spdxId).toBe("MIT");
	});

	it("should return null for nonexistent license", () => {
		expect(resolveLicense("nonexistent")).toBeNull();
	});
});

describe("getAllLicenses", () => {
	it("should return 14 licenses", () => {
		expect(getAllLicenses()).toHaveLength(14);
	});
});

describe("getLicensesByCategory", () => {
	it("should return only permissive licenses", () => {
		const results = getLicensesByCategory("permissive");
		expect(results.length).toBeGreaterThan(0);
		for (const l of results) {
			expect(l.category).toBe("permissive");
		}
	});

	it("should return only copyleft licenses", () => {
		const results = getLicensesByCategory("copyleft");
		expect(results.length).toBeGreaterThan(0);
		for (const l of results) {
			expect(l.category).toBe("copyleft");
		}
	});
});

describe("searchLicenses", () => {
	it("should return GPL variants when searching for gpl", () => {
		const results = searchLicenses("gpl");
		const ids = results.map((l) => l.spdxId);
		expect(ids).toContain("GPL-2.0");
		expect(ids).toContain("GPL-3.0");
		expect(ids).toContain("AGPL-3.0");
		expect(ids).toContain("LGPL-3.0");
	});

	it("should return all licenses for empty query", () => {
		expect(searchLicenses("")).toHaveLength(14);
	});
});
