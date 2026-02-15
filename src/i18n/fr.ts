import type { TranslationKeys } from "@/i18n/keys";

export const fr: TranslationKeys = {
	cli: {
		title: "LicenseKit",
		tagline: "Choisissez, comprenez et ajoutez la bonne licence a votre projet.",
		version: "Version",
	},
	wizard: {
		projectType: {
			question: "Sur quel type de projet travaillez-vous ?",
			library: "Une librairie ou un framework",
			personal: "Un projet personnel ou hobby",
			commercial: "Un produit commercial",
			documentation: "De la documentation ou du contenu creatif",
		},
		commercialUse: {
			question: "Souhaitez-vous autoriser l'utilisation commerciale de votre code ?",
			yes: "Oui, autoriser l'utilisation commerciale",
			no: "Non, restreindre l'utilisation commerciale",
		},
		copyleft: {
			question: "Voulez-vous obliger les travaux derives a utiliser la meme licence ?",
			none: "Non, les laisser utiliser n'importe quelle licence (permissive)",
			strong: "Oui, tous les derives doivent utiliser la meme licence (copyleft fort)",
			weak: "Seules les modifications de mes fichiers doivent garder la meme licence (copyleft faible)",
		},
		patentProtection: {
			question:
				"Souhaitez-vous une protection explicite des brevets pour les contributeurs et utilisateurs ?",
			yes: "Oui, inclure une concession de brevet",
			no: "Non, la protection des brevets n'est pas necessaire",
		},
		results: {
			title: "Licences recommandees",
			recommended: "Meilleure correspondance",
			select: "Selectionnez une licence a appliquer",
		},
		author: {
			question: "Nom de l'auteur pour la licence",
			detected: "(detecte depuis la configuration git)",
		},
		year: {
			question: "Annee de copyright",
		},
		confirm: {
			overwrite: "Un fichier LICENSE existe deja. Le remplacer ?",
		},
		done: "Fichier LICENSE cree avec succes.",
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
			description: "Ce logiciel peut etre utilise a des fins commerciales.",
		},
		modifications: {
			label: "Modifications",
			description: "Ce logiciel peut etre modifie.",
		},
		distribution: {
			label: "Distribution",
			description: "Ce logiciel peut etre distribue.",
		},
		patentUse: {
			label: "Utilisation de brevets",
			description:
				"Cette licence accorde explicitement des droits de brevet de la part des contributeurs.",
		},
		privateUse: {
			label: "Utilisation privee",
			description: "Ce logiciel peut etre utilise et modifie en prive.",
		},
		includeCopyright: {
			label: "Avis de licence et de copyright",
			description:
				"Une copie de la licence et de l'avis de copyright doit etre incluse avec le logiciel.",
		},
		documentChanges: {
			label: "Documenter les modifications",
			description: "Les modifications apportees au code doivent etre documentees.",
		},
		sameLicense: {
			label: "Meme licence",
			description:
				"Les modifications doivent etre publiees sous la meme licence lors de la distribution du logiciel.",
		},
		networkUseIsDistribution: {
			label: "Utilisation reseau = distribution",
			description:
				"Les utilisateurs qui interagissent avec le logiciel via le reseau ont le droit de recevoir une copie du code source.",
		},
		noLiability: {
			label: "Limitation de responsabilite",
			description: "Cette licence inclut une limitation de responsabilite.",
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
		detected: "Manifeste {ecosystem} trouve : {filePath}",
		promptUpdate: "Mettre a jour le champ license dans {filePath} vers {spdxId} ?",
		updated: "Champ license mis a jour dans {filePath} vers {spdxId}.",
		alreadySet: "Le champ license dans {filePath} est deja defini sur {spdxId}.",
		updateError: "Impossible de mettre a jour le champ license dans {filePath}.",
	},
	errors: {
		licenseNotFound: "Licence introuvable. Verifiez l'identifiant et reessayez.",
		writeError: "Impossible d'ecrire le fichier LICENSE. Verifiez les permissions du fichier.",
		networkError:
			"Impossible de recuperer les donnees de licence. Verifiez votre connexion internet.",
	},
};
