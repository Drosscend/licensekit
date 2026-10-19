import type { TranslationKeys } from "@/i18n/keys";

export const fr: TranslationKeys = {
	cli: {
		title: "LicenseKit",
		tagline: "Choisissez, comprenez et ajoutez la bonne licence à votre projet.",
		version: "Version",
	},
	wizard: {
		projectType: {
			question: "Sur quel type de projet travaillez-vous ?",
			library: "Une librairie ou un framework",
			personal: "Un projet personnel ou hobby",
			commercial: "Un produit commercial",
			documentation: "De la documentation ou du contenu créatif",
		},
		commercialUse: {
			question: "Souhaitez-vous autoriser l'utilisation commerciale de votre code ?",
			yes: "Oui, autoriser l'utilisation commerciale",
			no: "Non, restreindre l'utilisation commerciale",
		},
		copyleft: {
			question: "Voulez-vous obliger les travaux dérivés à utiliser la même licence ?",
			none: "Non, les laisser utiliser n'importe quelle licence (permissive)",
			strong: "Oui, tous les dérivés doivent utiliser la même licence (copyleft fort)",
			weak: "Seules les modifications de mes fichiers doivent garder la même licence (copyleft faible)",
		},
		patentProtection: {
			question:
				"Souhaitez-vous une protection explicite des brevets pour les contributeurs et utilisateurs ?",
			yes: "Oui, inclure une concession de brevet",
			no: "Non, la protection des brevets n'est pas nécessaire",
		},
		results: {
			title: "Licences recommandées",
			recommended: "Meilleure correspondance",
			select: "Sélectionnez une licence à appliquer",
		},
		author: {
			question: "Nom de l'auteur pour la licence",
			detected: "(détecté depuis la configuration git)",
		},
		year: {
			question: "Année de copyright",
		},
		confirm: {
			overwrite: "Un fichier LICENSE existe déjà. Le remplacer ?",
		},
		done: "Fichier LICENSE créé avec succès.",
	},
	license: {
		permissions: "Permissions",
		conditions: "Conditions",
		limitations: "Limitations",
		category: {
			permissive: "Permissive",
			copyleft: "Copyleft",
			weakCopyleft: "Copyleft faible",
			publicDomain: "Domaine public",
		},
	},
	rules: {
		commercialUse: {
			label: "Utilisation commerciale",
			description: "Ce logiciel peut être utilisé à des fins commerciales.",
		},
		modifications: {
			label: "Modifications",
			description: "Ce logiciel peut être modifié.",
		},
		distribution: {
			label: "Distribution",
			description: "Ce logiciel peut être distribué.",
		},
		patentUse: {
			label: "Utilisation de brevets",
			description:
				"Cette licence accorde explicitement des droits de brevet de la part des contributeurs.",
		},
		privateUse: {
			label: "Utilisation privée",
			description: "Ce logiciel peut être utilisé et modifié en privé.",
		},
		includeCopyright: {
			label: "Avis de licence et de copyright",
			description:
				"Une copie de la licence et de l'avis de copyright doit être incluse avec le logiciel.",
		},
		documentChanges: {
			label: "Documenter les modifications",
			description: "Les modifications apportées au code doivent être documentées.",
		},
		discloseSource: {
			label: "Publier le code source",
			description:
				"Le code source doit être mis à disposition lors de la distribution du logiciel.",
		},
		sameLicense: {
			label: "Même licence",
			description:
				"Les modifications doivent être publiées sous la même licence lors de la distribution du logiciel.",
		},
		networkUseIsDistribution: {
			label: "Utilisation réseau = distribution",
			description:
				"Les utilisateurs qui interagissent avec le logiciel via le réseau ont le droit de recevoir une copie du code source.",
		},
		noLiability: {
			label: "Limitation de responsabilité",
			description: "Cette licence inclut une limitation de responsabilité.",
		},
		noWarranty: {
			label: "Aucune garantie",
			description: "Cette licence stipule explicitement qu'elle ne fournit aucune garantie.",
		},
		trademarkUse: {
			label: "Utilisation de marques",
			description:
				"Cette licence stipule explicitement qu'elle n'accorde pas de droits sur les marques.",
		},
		noPatentUse: {
			label: "Aucun droit de brevet",
			description:
				"Cette licence stipule explicitement qu'elle n'accorde aucun droit sur les brevets des contributeurs.",
		},
	},
	manifest: {
		detected: "Manifeste {ecosystem} trouvé : {filePath}",
		promptUpdate: "Mettre à jour le champ license dans {filePath} vers {spdxId} ?",
		updated: "Champ license mis à jour dans {filePath} vers {spdxId}.",
		alreadySet: "Le champ license dans {filePath} est déjà défini sur {spdxId}.",
		updateError: "Impossible de mettre à jour le champ license dans {filePath}.",
	},
	errors: {
		licenseNotFound: "Licence introuvable. Vérifiez l'identifiant et réessayez.",
		writeError: "Impossible d'écrire le fichier LICENSE. Vérifiez les permissions du fichier.",
		networkError:
			"Impossible de récupérer les données de licence. Vérifiez votre connexion internet.",
	},
};
