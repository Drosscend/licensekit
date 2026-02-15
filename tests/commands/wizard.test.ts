import { describe, expect, it } from "bun:test";

import type { WizardOptions } from "@/commands/wizard";

describe("wizard module", () => {
	it("should import without throwing", async () => {
		const mod = await import("@/commands/wizard");
		expect(typeof mod.runWizard).toBe("function");
	});

	it("should accept valid WizardOptions", () => {
		const opts: WizardOptions = {
			author: "Alice",
			year: "2026",
			output: "./LICENSE",
			lang: "en",
		};
		expect(opts.author).toBe("Alice");
	});
});
