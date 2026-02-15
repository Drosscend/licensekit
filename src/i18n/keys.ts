/** Shape of all translatable strings used by the CLI. */
export type TranslationKeys = {
	cli: {
		title: string;
		tagline: string;
		version: string;
	};
	wizard: {
		projectType: {
			question: string;
			library: string;
			personal: string;
			commercial: string;
			documentation: string;
		};
		commercialUse: {
			question: string;
			yes: string;
			no: string;
		};
		copyleft: {
			question: string;
			none: string;
			strong: string;
			weak: string;
		};
		patentProtection: {
			question: string;
			yes: string;
			no: string;
		};
		results: {
			title: string;
			recommended: string;
			select: string;
		};
		author: {
			question: string;
			detected: string;
		};
		year: {
			question: string;
		};
		confirm: {
			overwrite: string;
		};
		done: string;
	};
	license: {
		permissions: string;
		conditions: string;
		limitations: string;
		category: {
			permissive: string;
			copyleft: string;
			weakCopyleft: string;
			publicDomain: string;
		};
	};
	rules: {
		commercialUse: { label: string; description: string };
		modifications: { label: string; description: string };
		distribution: { label: string; description: string };
		patentUse: { label: string; description: string };
		privateUse: { label: string; description: string };
		includeCopyright: { label: string; description: string };
		documentChanges: { label: string; description: string };
		sameLicense: { label: string; description: string };
		networkUseIsDistribution: { label: string; description: string };
		noLiability: { label: string; description: string };
		noWarranty: { label: string; description: string };
		trademarkUse: { label: string; description: string };
		noPatentUse: { label: string; description: string };
	};
	manifest: {
		detected: string;
		promptUpdate: string;
		updated: string;
		alreadySet: string;
		updateError: string;
	};
	errors: {
		licenseNotFound: string;
		writeError: string;
		networkError: string;
	};
};
