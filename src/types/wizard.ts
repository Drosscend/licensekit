/** Answers collected from the interactive wizard. */
export type WizardAnswer = {
	projectType: "library" | "personal" | "commercial" | "documentation";
	commercialUse: boolean;
	copyleft: "none" | "strong" | "weak";
	patentProtection: boolean;
};

/** Score assigned to a license based on wizard answers. */
export type LicenseScore = {
	spdxId: string;
	score: number;
};
