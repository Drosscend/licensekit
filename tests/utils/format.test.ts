import { describe, expect, it } from "bun:test";

import {
	formatCategory,
	formatCondition,
	formatDim,
	formatLimitation,
	formatPermission,
	formatSectionTitle,
} from "@/utils/format";

describe("formatPermission", () => {
	it("should include the [+] prefix and the original text", () => {
		const result = formatPermission("Commercial use");
		expect(result).toContain("[+]");
		expect(result).toContain("Commercial use");
	});
});

describe("formatCondition", () => {
	it("should include the [i] prefix and the original text", () => {
		const result = formatCondition("Include copyright");
		expect(result).toContain("[i]");
		expect(result).toContain("Include copyright");
	});
});

describe("formatLimitation", () => {
	it("should include the [!] prefix and the original text", () => {
		const result = formatLimitation("No liability");
		expect(result).toContain("[!]");
		expect(result).toContain("No liability");
	});
});

describe("formatCategory", () => {
	it("should return a non-empty string for each category", () => {
		expect(formatCategory("permissive").length).toBeGreaterThan(0);
		expect(formatCategory("copyleft").length).toBeGreaterThan(0);
		expect(formatCategory("weak-copyleft").length).toBeGreaterThan(0);
		expect(formatCategory("public-domain").length).toBeGreaterThan(0);
	});
});

describe("formatSectionTitle", () => {
	it("should return a non-empty string containing the input", () => {
		const result = formatSectionTitle("Permissions");
		expect(result).toContain("Permissions");
	});
});

describe("formatDim", () => {
	it("should return a non-empty string containing the input", () => {
		const result = formatDim("secondary info");
		expect(result).toContain("secondary info");
	});
});
