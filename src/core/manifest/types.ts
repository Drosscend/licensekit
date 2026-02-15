/** Result of detecting a manifest file in a project directory. */
export type ManifestDetection = {
	ecosystem: string;
	filePath: string;
	currentLicense: string | null;
};

/** Adapter interface for detecting and updating manifest files. */
export type ManifestAdapter = {
	ecosystem: string;
	fileName: string;
	/** Detects a manifest file in the given directory and reads its license field. */
	detect(directory: string): Promise<ManifestDetection | null>;
	/** Updates the license field in the manifest file. Returns true on success. */
	update(filePath: string, spdxId: string): Promise<boolean>;
};
