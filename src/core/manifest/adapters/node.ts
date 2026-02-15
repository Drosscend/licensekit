import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import type { ManifestAdapter, ManifestDetection } from "@/core/manifest/types";

/** Detects the indentation style used in a JSON string. */
function detectIndentation(raw: string): string {
	const match = raw.match(/^(\t| +)/m);
	return match ? match[1] : "  ";
}

/** Manifest adapter for Node.js projects (package.json). */
export const NodeManifestAdapter: ManifestAdapter = {
	ecosystem: "Node.js",
	fileName: "package.json",

	async detect(directory: string): Promise<ManifestDetection | null> {
		const filePath = join(directory, "package.json");

		if (!existsSync(filePath)) {
			return null;
		}

		try {
			const raw = readFileSync(filePath, "utf-8");
			const parsed = JSON.parse(raw);
			const currentLicense = typeof parsed.license === "string" ? parsed.license : null;

			return { ecosystem: "Node.js", filePath, currentLicense };
		} catch {
			return null;
		}
	},

	async update(filePath: string, spdxId: string): Promise<boolean> {
		try {
			const raw = readFileSync(filePath, "utf-8");
			const indent = detectIndentation(raw);
			const parsed = JSON.parse(raw);

			parsed.license = spdxId;

			const updated = `${JSON.stringify(parsed, null, indent)}\n`;
			writeFileSync(filePath, updated, "utf-8");

			return true;
		} catch {
			return false;
		}
	},
};
