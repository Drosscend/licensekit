/** Score modifier applied to a specific license for a given answer. */
export type ScoreModifier = {
	spdxId: string;
	points: number;
};

/** Scoring definition for a single wizard question. */
export type QuestionScoring = {
	key: string;
	answers: Record<string, ScoreModifier[]>;
};

function boost(spdxIds: string[], points: number): ScoreModifier[] {
	return spdxIds.map((spdxId) => ({ spdxId, points }));
}

/** Scoring matrix that maps wizard answers to license score modifiers. */
export const SCORING_MATRIX: QuestionScoring[] = [
	{
		key: "projectType",
		answers: {
			library: [
				...boost(["MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC"], 3),
				...boost(["LGPL-3.0", "MPL-2.0"], 1),
			],
			personal: [
				...boost(["MIT", "Unlicense", "ISC", "CC0-1.0"], 3),
				...boost(["BSD-2-Clause", "BSD-3-Clause"], 1),
				...boost(["AGPL-3.0"], -2),
			],
			commercial: [
				...boost(["MIT", "Apache-2.0", "BSD-3-Clause"], 3),
				...boost(["ISC", "BSL-1.0"], 1),
				...boost(["GPL-3.0", "GPL-2.0", "AGPL-3.0"], -2),
			],
			documentation: [
				...boost(["CC0-1.0"], 3),
				...boost(["Unlicense", "MIT"], 1),
				...boost(["GPL-3.0", "GPL-2.0", "AGPL-3.0", "LGPL-3.0"], -2),
			],
		},
	},
	{
		key: "commercialUse",
		answers: {
			true: [...boost(["MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "BSL-1.0"], 2)],
			false: [...boost(["GPL-3.0", "GPL-2.0", "AGPL-3.0"], 2)],
		},
	},
	{
		key: "copyleft",
		answers: {
			none: [
				...boost(
					[
						"MIT",
						"Apache-2.0",
						"BSD-2-Clause",
						"BSD-3-Clause",
						"ISC",
						"Unlicense",
						"CC0-1.0",
						"BSL-1.0",
					],
					4,
				),
				...boost(["GPL-3.0", "GPL-2.0", "AGPL-3.0", "LGPL-3.0", "MPL-2.0"], -3),
			],
			strong: [
				...boost(["GPL-3.0", "GPL-2.0", "AGPL-3.0"], 4),
				...boost(
					[
						"MIT",
						"Apache-2.0",
						"BSD-2-Clause",
						"BSD-3-Clause",
						"ISC",
						"Unlicense",
						"CC0-1.0",
						"BSL-1.0",
					],
					-3,
				),
			],
			weak: [
				...boost(["LGPL-3.0", "MPL-2.0", "EPL-2.0"], 4),
				...boost(["GPL-3.0", "AGPL-3.0", "Unlicense", "CC0-1.0"], -3),
			],
		},
	},
	{
		key: "patentProtection",
		answers: {
			true: [
				...boost(["Apache-2.0", "GPL-3.0", "AGPL-3.0", "MPL-2.0"], 3),
				...boost(["MIT", "BSD-2-Clause", "BSD-3-Clause", "ISC"], -1),
			],
			false: [...boost(["MIT", "BSD-2-Clause", "BSD-3-Clause", "ISC", "Unlicense", "CC0-1.0"], 3)],
		},
	},
];
