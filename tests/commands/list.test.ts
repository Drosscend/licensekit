import { describe, expect, it } from "bun:test";

import { runList } from "@/commands/list";

describe("runList", () => {
	it("should not throw when called with en", () => {
		expect(() => runList("en")).not.toThrow();
	});

	it("should not throw when called with fr", () => {
		expect(() => runList("fr")).not.toThrow();
	});
});
