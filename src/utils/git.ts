import type { GitUserInfo } from "@/types/cli";

/**
 * Reads a value from the global git configuration.
 * Returns null if the command fails or returns empty output.
 */
function readGitConfig(key: string): string | null {
	try {
		const result = Bun.spawnSync(["git", "config", "--global", key]);

		if (result.exitCode !== 0) {
			return null;
		}

		const output = result.stdout.toString().trim();
		return output.length > 0 ? output : null;
	} catch {
		return null;
	}
}

/**
 * Returns the user's name and email from the global git configuration.
 * Fields are null if the corresponding git config value is not set.
 */
export function getGitUserInfo(): GitUserInfo {
	return {
		name: readGitConfig("user.name"),
		email: readGitConfig("user.email"),
	};
}

/** Returns the user's name from the global git configuration, or null. */
export function getGitUserName(): string | null {
	return getGitUserInfo().name;
}

/** Returns the user's email from the global git configuration, or null. */
export function getGitUserEmail(): string | null {
	return getGitUserInfo().email;
}
