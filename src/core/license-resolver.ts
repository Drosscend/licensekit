import { LICENSE_MAP, LICENSES } from "@/data/licenses/index";
import type { LicenseCategory, LicenseMetadata } from "@/types/license";

/**
 * Resolves a license by its identifier.
 * Tries exact spdxId match, then name match, then partial name, then key.
 * Returns null if nothing matches.
 */
export function resolveLicense(query: string): LicenseMetadata | null {
	const q = query.toLowerCase();

	// Exact spdxId match (case-insensitive)
	for (const license of LICENSES) {
		if (license.spdxId.toLowerCase() === q) {
			return license;
		}
	}

	// Exact name match (case-insensitive)
	for (const license of LICENSES) {
		if (license.name.toLowerCase() === q) {
			return license;
		}
	}

	// Partial name match (case-insensitive)
	for (const license of LICENSES) {
		if (license.name.toLowerCase().includes(q)) {
			return license;
		}
	}

	// Key match (e.g., "gpl-3.0" maps to spdxId via the map keys or common patterns)
	const byKey = LICENSE_MAP.get(query.toUpperCase());
	if (byKey) {
		return byKey;
	}

	return null;
}

/** Returns all bundled licenses. */
export function getAllLicenses(): LicenseMetadata[] {
	return LICENSES;
}

/** Returns all licenses belonging to the given category. */
export function getLicensesByCategory(category: LicenseCategory): LicenseMetadata[] {
	return LICENSES.filter((l) => l.category === category);
}

/**
 * Returns all licenses that partially match the query on spdxId or name.
 * Returns all licenses if the query is empty.
 */
export function searchLicenses(query: string): LicenseMetadata[] {
	if (query === "") {
		return LICENSES;
	}

	const q = query.toLowerCase();
	return LICENSES.filter(
		(l) => l.spdxId.toLowerCase().includes(q) || l.name.toLowerCase().includes(q),
	);
}
