import { afterEach, describe, expect, it } from "bun:test";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

import { getDefaultOutputPath, licenseFileExists, writeLicenseFile } from "@/core/file-writer";

const TMP_DIR = join(import.meta.dir, ".tmp-test-writer");

function tmpPath(filename: string): string {
	return join(TMP_DIR, filename);
}

afterEach(() => {
	if (existsSync(TMP_DIR)) {
		rmSync(TMP_DIR, { recursive: true });
	}
});

describe("writeLicenseFile", () => {
	it("should create a file with the correct content", async () => {
		const path = tmpPath("LICENSE");
		await writeLicenseFile("MIT License content", path);
		const content = readFileSync(path, "utf-8");
		expect(content).toBe("MIT License content");
	});

	it("should overwrite an existing file", async () => {
		const path = tmpPath("LICENSE");
		await writeLicenseFile("first version", path);
		await writeLicenseFile("second version", path);
		const content = readFileSync(path, "utf-8");
		expect(content).toBe("second version");
	});
});

describe("licenseFileExists", () => {
	it("should return true for an existing file", async () => {
		const path = tmpPath("LICENSE");
		await writeLicenseFile("content", path);
		expect(await licenseFileExists(path)).toBe(true);
	});

	it("should return false for a non-existing file", async () => {
		expect(await licenseFileExists(tmpPath("NOPE"))).toBe(false);
	});
});

describe("getDefaultOutputPath", () => {
	it("should return a path ending with LICENSE", () => {
		const result = getDefaultOutputPath();
		expect(result.endsWith("LICENSE")).toBe(true);
	});
});
