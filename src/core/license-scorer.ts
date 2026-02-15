import { resolveLicense } from "@/core/license-resolver";
import { LICENSE_KEYS } from "@/data/licenses/index";
import { SCORING_MATRIX } from "@/data/questions";
import type { LicenseMetadata } from "@/types/license";
import type { LicenseScore, WizardAnswer } from "@/types/wizard";

/**
 * Computes a score for each bundled license based on wizard answers.
 * Returns all licenses sorted by score descending, then alphabetically by spdxId.
 */
export function scoreLicenses(answers: WizardAnswer): LicenseScore[] {
	const scores: Record<string, number> = {};

	for (const key of LICENSE_KEYS) {
		scores[key] = 0;
	}

	for (const question of SCORING_MATRIX) {
		const answerValue = String(answers[question.key as keyof WizardAnswer]);
		const modifiers = question.answers[answerValue];

		if (!modifiers) {
			continue;
		}

		for (const modifier of modifiers) {
			if (scores[modifier.spdxId] !== undefined) {
				scores[modifier.spdxId] += modifier.points;
			}
		}
	}

	return Object.entries(scores)
		.map(([spdxId, score]) => ({ spdxId, score }))
		.sort((a, b) => {
			if (b.score !== a.score) {
				return b.score - a.score;
			}
			return a.spdxId.localeCompare(b.spdxId);
		});
}

/**
 * Returns the top-scoring licenses as full LicenseMetadata objects.
 * Defaults to 3 results.
 */
export function getTopLicenses(answers: WizardAnswer, limit = 3): LicenseMetadata[] {
	const ranked = scoreLicenses(answers).slice(0, limit);
	const results: LicenseMetadata[] = [];

	for (const entry of ranked) {
		const license = resolveLicense(entry.spdxId);
		if (license) {
			results.push(license);
		}
	}

	return results;
}
