import { describe, expect, it } from "bun:test";

import { getGitUserInfo } from "@/utils/git";

describe("getGitUserInfo", () => {
	it("should return trimmed, non-empty strings when git config is set", () => {
		const info = getGitUserInfo();

		if (info.name !== null) {
			expect(info.name).toBe(info.name.trim());
			expect(info.name.length).toBeGreaterThan(0);
		}

		if (info.email !== null) {
			expect(info.email).toBe(info.email.trim());
			expect(info.email.length).toBeGreaterThan(0);
		}
	});
});
