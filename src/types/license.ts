/** A single rule (permission, condition, or limitation). */
export type LicenseRule = {
	tag: string;
	label: string;
	description: string;
};

/** The three categories of rules attached to a license. */
export type LicenseRuleSet = {
	permissions: LicenseRule[];
	conditions: LicenseRule[];
	limitations: LicenseRule[];
};

/** Full license metadata including text and rules. */
export type LicenseMetadata = {
	spdxId: string;
	name: string;
	description: string;
	body: string;
	permissions: string[];
	conditions: string[];
	limitations: string[];
	category: LicenseCategory;
};

/** High-level classification of a license. */
export type LicenseCategory = "permissive" | "copyleft" | "weak-copyleft" | "public-domain";

/** Placeholders that can be filled in a license body. */
export type LicensePlaceholders = {
	year: string;
	fullname: string;
};
