import type { TranslationKeys } from "@/i18n/keys";

export const en: TranslationKeys = {
	cli: {
		title: "LicenseKit",
		tagline: "Choose, understand, and add the right license to your project.",
		version: "Version",
	},
	wizard: {
		projectType: {
			question: "What type of project are you working on?",
			library: "A library or framework",
			personal: "A personal or hobby project",
			commercial: "A commercial product",
			documentation: "Documentation or creative content",
		},
		commercialUse: {
			question: "Should others be allowed to use your code commercially?",
			yes: "Yes, allow commercial use",
			no: "No, restrict commercial use",
		},
		copyleft: {
			question: "Do you want to require derivative works to use the same license?",
			none: "No, let them use any license (permissive)",
			strong: "Yes, all derivatives must use the same license (strong copyleft)",
			weak: "Only modifications to my files must keep the same license (weak copyleft)",
		},
		patentProtection: {
			question: "Do you want explicit patent protection for contributors and users?",
			yes: "Yes, include a patent grant",
			no: "No, patent protection is not needed",
		},
		results: {
			title: "Recommended licenses",
			recommended: "Best match",
			select: "Select a license to apply",
		},
		author: {
			question: "Author name for the license",
			detected: "(detected from git config)",
		},
		year: {
			question: "Copyright year",
		},
		confirm: {
			overwrite: "A LICENSE file already exists. Overwrite it?",
		},
		done: "LICENSE file created successfully.",
	},
	license: {
		permissions: "Permissions",
		conditions: "Conditions",
		limitations: "Limitations",
		category: {
			permissive: "Permissive",
			copyleft: "Copyleft",
			weakCopyleft: "Weak Copyleft",
			publicDomain: "Public Domain",
		},
	},
	rules: {
		commercialUse: {
			label: "Commercial use",
			description: "This software may be used for commercial purposes.",
		},
		modifications: {
			label: "Modifications",
			description: "This software may be modified.",
		},
		distribution: {
			label: "Distribution",
			description: "This software may be distributed.",
		},
		patentUse: {
			label: "Patent use",
			description: "This license provides an express grant of patent rights from contributors.",
		},
		privateUse: {
			label: "Private use",
			description: "This software may be used and modified in private.",
		},
		includeCopyright: {
			label: "License and copyright notice",
			description: "A copy of the license and copyright notice must be included with the software.",
		},
		documentChanges: {
			label: "State changes",
			description: "Changes made to the code must be documented.",
		},
		sameLicense: {
			label: "Same license",
			description:
				"Modifications must be released under the same license when distributing the software.",
		},
		networkUseIsDistribution: {
			label: "Network use is distribution",
			description:
				"Users who interact with the software via network are given the right to receive a copy of the source code.",
		},
		noLiability: {
			label: "Limitation of liability",
			description: "This license includes a limitation of liability.",
		},
		noWarranty: {
			label: "No warranty",
			description: "This license explicitly states that it does not provide any warranty.",
		},
		trademarkUse: {
			label: "Trademark use",
			description: "This license explicitly states that it does not grant trademark rights.",
		},
		noPatentUse: {
			label: "No patent rights",
			description:
				"This license explicitly states that it does not grant any rights in the patents of contributors.",
		},
	},
	errors: {
		licenseNotFound: "License not found. Please check the identifier and try again.",
		writeError: "Failed to write the LICENSE file. Check file permissions.",
		networkError: "Failed to fetch license data. Check your internet connection.",
	},
};
