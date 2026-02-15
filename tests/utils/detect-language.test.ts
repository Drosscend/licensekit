import { afterEach, beforeEach, describe, expect, it } from "bun:test";

import { detectLanguage, isSupportedLanguage } from "@/utils/detect-language";

const ENV_KEYS = ["LANG", "LC_ALL", "LC_MESSAGES", "LANGUAGE"] as const;

describe("detectLanguage", () => {
	const savedEnv: Record<string, string | undefined> = {};

	beforeEach(() => {
		for (const key of ENV_KEYS) {
			savedEnv[key] = process.env[key];
			delete process.env[key];
		}
	});

	afterEach(() => {
		for (const key of ENV_KEYS) {
			if (savedEnv[key] !== undefined) {
				process.env[key] = savedEnv[key];
			} else {
				delete process.env[key];
			}
		}
	});

	it("should return 'fr' when LANG is fr_FR.UTF-8", () => {
		process.env.LANG = "fr_FR.UTF-8";
		expect(detectLanguage()).toBe("fr");
	});

	it("should return 'en' when LANG is en_US.UTF-8", () => {
		process.env.LANG = "en_US.UTF-8";
		expect(detectLanguage()).toBe("en");
	});

	it("should return 'en' for unsupported languages", () => {
		process.env.LANG = "de_DE.UTF-8";
		expect(detectLanguage()).toBe("en");
	});

	it("should return 'en' when no env variables are set", () => {
		expect(detectLanguage()).toBe("en");
	});

	it("should check LC_ALL when LANG is not set", () => {
		process.env.LC_ALL = "fr_CA.UTF-8";
		expect(detectLanguage()).toBe("fr");
	});

	it("should prioritize LANG over LC_ALL", () => {
		process.env.LANG = "en_US.UTF-8";
		process.env.LC_ALL = "fr_FR.UTF-8";
		expect(detectLanguage()).toBe("en");
	});
});

describe("isSupportedLanguage", () => {
	it("should return true for 'en'", () => {
		expect(isSupportedLanguage("en")).toBe(true);
	});

	it("should return true for 'fr'", () => {
		expect(isSupportedLanguage("fr")).toBe(true);
	});

	it("should return false for unsupported languages", () => {
		expect(isSupportedLanguage("de")).toBe(false);
		expect(isSupportedLanguage("es")).toBe(false);
		expect(isSupportedLanguage("")).toBe(false);
	});
});
