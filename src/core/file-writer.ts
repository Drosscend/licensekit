import { dirname, resolve } from "node:path";

/** Writes the license content to the given path. Creates parent directories if needed. */
export async function writeLicenseFile(content: string, outputPath: string): Promise<void> {
	const { mkdirSync } = await import("node:fs");
	const dir = dirname(outputPath);

	mkdirSync(dir, { recursive: true });
	await Bun.write(outputPath, content);
}

/** Returns true if a file already exists at the given path. */
export async function licenseFileExists(outputPath: string): Promise<boolean> {
	return Bun.file(outputPath).exists();
}

/** Returns the default output path for the LICENSE file. */
export function getDefaultOutputPath(): string {
	return resolve(process.cwd(), "LICENSE");
}
