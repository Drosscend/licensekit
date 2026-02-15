import { describe, expect, it } from "bun:test";

import { detectPlaceholders, fillPlaceholders, hasPlaceholders } from "@/core/template-engine";

describe("fillPlaceholders", () => {
	it("should replace [year] with the given year", () => {
		const result = fillPlaceholders("Copyright [year]", { year: "2026", fullname: "" });
		expect(result).toBe("Copyright 2026");
	});

	it("should replace [fullname] with the given name", () => {
		const result = fillPlaceholders("by [fullname]", { year: "", fullname: "Alice" });
		expect(result).toBe("by Alice");
	});

	it("should replace both placeholders in one pass", () => {
		const result = fillPlaceholders("Copyright (c) [year] [fullname]", {
			year: "2026",
			fullname: "Alice",
		});
		expect(result).toBe("Copyright (c) 2026 Alice");
	});

	it("should leave unknown placeholders untouched", () => {
		const result = fillPlaceholders("[year] [project]", { year: "2026", fullname: "Alice" });
		expect(result).toBe("2026 [project]");
	});
});

describe("detectPlaceholders", () => {
	it("should detect year and fullname in MIT body", () => {
		const body = "Copyright (c) [year] [fullname]";
		const placeholders = detectPlaceholders(body);
		expect(placeholders).toContain("year");
		expect(placeholders).toContain("fullname");
	});

	it("should return empty array for body with no placeholders", () => {
		expect(detectPlaceholders("No placeholders here")).toEqual([]);
	});
});

describe("hasPlaceholders", () => {
	it("should return true for body with placeholders", () => {
		expect(hasPlaceholders("Copyright [year]")).toBe(true);
	});

	it("should return false for body without placeholders", () => {
		expect(hasPlaceholders("No placeholders")).toBe(false);
	});
});
