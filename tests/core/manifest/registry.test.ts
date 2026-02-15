import { afterEach, describe, expect, it } from "bun:test";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { detectManifests, getAdapter, registerAdapter } from "@/core/manifest/registry";
import type { ManifestAdapter } from "@/core/manifest/types";

const TMP_DIR = join(import.meta.dir, ".tmp-test-registry");

afterEach(() => {
	if (existsSync(TMP_DIR)) {
		rmSync(TMP_DIR, { recursive: true });
	}
});

describe("detectManifests", () => {
	it("should return an empty array when no manifests are found", async () => {
		mkdirSync(TMP_DIR, { recursive: true });
		const results = await detectManifests(TMP_DIR);
		expect(results).toEqual([]);
	});

	it("should detect a Node.js manifest when package.json exists", async () => {
		mkdirSync(TMP_DIR, { recursive: true });
		writeFileSync(join(TMP_DIR, "package.json"), JSON.stringify({ name: "test", license: "MIT" }));

		const results = await detectManifests(TMP_DIR);
		expect(results.length).toBe(1);
		expect(results[0].ecosystem).toBe("Node.js");
		expect(results[0].currentLicense).toBe("MIT");
	});
});

describe("getAdapter", () => {
	it("should return the Node.js adapter", () => {
		const adapter = getAdapter("Node.js");
		expect(adapter).not.toBeNull();
		expect(adapter?.ecosystem).toBe("Node.js");
	});

	it("should return null for an unknown ecosystem", () => {
		const adapter = getAdapter("Unknown");
		expect(adapter).toBeNull();
	});
});

describe("registerAdapter", () => {
	it("should register a custom adapter", async () => {
		const customAdapter: ManifestAdapter = {
			ecosystem: "TestEcosystem",
			fileName: "test.toml",
			async detect() {
				return null;
			},
			async update() {
				return false;
			},
		};

		registerAdapter(customAdapter);
		const adapter = getAdapter("TestEcosystem");
		expect(adapter).not.toBeNull();
		expect(adapter?.fileName).toBe("test.toml");
	});
});
