import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/** Writes the license content to the given path. Creates parent directories if needed. */
export async function writeLicenseFile(content: string, outputPath: string): Promise<void> {
	const dir = dirname(resolve(outputPath));

	if (dir !== ".") {
		mkdirSync(dir, { recursive: true });
	}

	writeFileSync(outputPath, content, "utf-8");
}

/** Returns true if a file already exists at the given path. */
export async function licenseFileExists(outputPath: string): Promise<boolean> {
	return existsSync(outputPath);
}

/** Returns the default output path for the LICENSE file. */
export function getDefaultOutputPath(): string {
	return resolve(process.cwd(), "LICENSE");
}
