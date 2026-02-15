import { NodeManifestAdapter } from "@/core/manifest/adapters/node";
import type { ManifestAdapter, ManifestDetection } from "@/core/manifest/types";

const adapters = new Map<string, ManifestAdapter>();

/** Registers a manifest adapter for a given ecosystem. */
export function registerAdapter(adapter: ManifestAdapter): void {
	adapters.set(adapter.ecosystem, adapter);
}

/** Returns the adapter for the given ecosystem, or null if not found. */
export function getAdapter(ecosystem: string): ManifestAdapter | null {
	return adapters.get(ecosystem) ?? null;
}

/** Detects all manifest files in the given directory. */
export async function detectManifests(directory: string): Promise<ManifestDetection[]> {
	const results: ManifestDetection[] = [];

	for (const adapter of adapters.values()) {
		const detection = await adapter.detect(directory);
		if (detection) {
			results.push(detection);
		}
	}

	return results;
}

// Auto-register built-in adapters
registerAdapter(NodeManifestAdapter);
