import type { LicenseCategory } from "@/types/license";

const API_BASE = "https://api.github.com/licenses";

const LICENSE_CATEGORIES: Record<string, LicenseCategory> = {
	mit: "permissive",
	"apache-2.0": "permissive",
	"gpl-3.0": "copyleft",
	"gpl-2.0": "copyleft",
	"agpl-3.0": "copyleft",
	"lgpl-3.0": "weak-copyleft",
	"mpl-2.0": "weak-copyleft",
	"bsd-2-clause": "permissive",
	"bsd-3-clause": "permissive",
	isc: "permissive",
	unlicense: "public-domain",
	"cc0-1.0": "public-domain",
	"bsl-1.0": "permissive",
	"epl-2.0": "weak-copyleft",
};

const SUPPORTED_KEYS = Object.keys(LICENSE_CATEGORIES);

const OUTPUT_DIR = "src/data/licenses";

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchLicense(key: string): Promise<void> {
	const response = await fetch(`${API_BASE}/${key}`, {
		headers: { Accept: "application/vnd.github.v3+json" },
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch ${key}: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();

	const license = {
		spdxId: data.spdx_id,
		name: data.name,
		description: data.description,
		body: data.body,
		permissions: data.permissions,
		conditions: data.conditions,
		limitations: data.limitations,
		category: LICENSE_CATEGORIES[key],
	};

	const path = `${OUTPUT_DIR}/${key}.json`;
	await Bun.write(path, JSON.stringify(license, null, "\t"));
	console.log(`  Saved ${path}`);
}

async function main(): Promise<void> {
	console.log(`Fetching ${SUPPORTED_KEYS.length} licenses from GitHub API...\n`);

	for (const key of SUPPORTED_KEYS) {
		console.log(`Fetching ${key}...`);
		await fetchLicense(key);
		await sleep(1000);
	}

	console.log("\nDone.");
}

main();
