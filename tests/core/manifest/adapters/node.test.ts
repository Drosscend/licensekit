import { afterEach, describe, expect, it } from "bun:test";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { NodeManifestAdapter } from "@/core/manifest/adapters/node";

const TMP_DIR = join(import.meta.dir, ".tmp-test-node-adapter");

function tmpPath(filename: string): string {
	return join(TMP_DIR, filename);
}

afterEach(() => {
	if (existsSync(TMP_DIR)) {
		rmSync(TMP_DIR, { recursive: true });
	}
});

describe("NodeManifestAdapter.detect", () => {
	it("should return null if no package.json exists", async () => {
		mkdirSync(TMP_DIR, { recursive: true });
		const result = await NodeManifestAdapter.detect(TMP_DIR);
		expect(result).toBeNull();
	});

	it("should return a valid ManifestDetection if package.json exists", async () => {
		mkdirSync(TMP_DIR, { recursive: true });
		writeFileSync(tmpPath("package.json"), JSON.stringify({ name: "test", license: "MIT" }));

		const result = await NodeManifestAdapter.detect(TMP_DIR);
		expect(result).not.toBeNull();
		expect(result?.ecosystem).toBe("Node.js");
		expect(result?.filePath).toBe(tmpPath("package.json"));
		expect(result?.currentLicense).toBe("MIT");
	});

	it("should return null for currentLicense if the field is missing", async () => {
		mkdirSync(TMP_DIR, { recursive: true });
		writeFileSync(tmpPath("package.json"), JSON.stringify({ name: "test" }));

		const result = await NodeManifestAdapter.detect(TMP_DIR);
		expect(result).not.toBeNull();
		expect(result?.currentLicense).toBeNull();
	});

	it("should return null if package.json contains invalid JSON", async () => {
		mkdirSync(TMP_DIR, { recursive: true });
		writeFileSync(tmpPath("package.json"), "not valid json {{{");

		const result = await NodeManifestAdapter.detect(TMP_DIR);
		expect(result).toBeNull();
	});
});

describe("NodeManifestAdapter.update", () => {
	it("should update the license field in package.json", async () => {
		mkdirSync(TMP_DIR, { recursive: true });
		const filePath = tmpPath("package.json");
		writeFileSync(filePath, JSON.stringify({ name: "test", license: "MIT" }, null, 2));

		const success = await NodeManifestAdapter.update(filePath, "Apache-2.0");
		expect(success).toBe(true);

		const content = JSON.parse(await Bun.file(filePath).text());
		expect(content.license).toBe("Apache-2.0");
	});

	it("should preserve other fields when updating", async () => {
		mkdirSync(TMP_DIR, { recursive: true });
		const filePath = tmpPath("package.json");
		const original = {
			name: "test",
			version: "1.0.0",
			license: "MIT",
			description: "A test package",
		};
		writeFileSync(filePath, JSON.stringify(original, null, 2));

		await NodeManifestAdapter.update(filePath, "GPL-3.0-only");

		const content = JSON.parse(await Bun.file(filePath).text());
		expect(content.name).toBe("test");
		expect(content.version).toBe("1.0.0");
		expect(content.description).toBe("A test package");
		expect(content.license).toBe("GPL-3.0-only");
	});

	it("should preserve indentation style", async () => {
		mkdirSync(TMP_DIR, { recursive: true });
		const filePath = tmpPath("package.json");
		writeFileSync(filePath, '{\n\t"name": "test",\n\t"license": "MIT"\n}\n');

		await NodeManifestAdapter.update(filePath, "ISC");

		const raw = await Bun.file(filePath).text();
		expect(raw).toContain('\t"name"');
		expect(raw).toContain('\t"license": "ISC"');
	});

	it("should return false if the file does not exist", async () => {
		const success = await NodeManifestAdapter.update(tmpPath("nonexistent.json"), "MIT");
		expect(success).toBe(false);
	});
});
