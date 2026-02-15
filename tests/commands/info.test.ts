import { describe, expect, it, spyOn } from "bun:test";

import { runInfo } from "@/commands/info";

describe("runInfo", () => {
	it("should not throw for a valid license", () => {
		expect(() => runInfo("MIT", "en")).not.toThrow();
	});

	it("should call process.exit for an unknown license", () => {
		const exitSpy = spyOn(process, "exit").mockImplementation(() => {
			throw new Error("process.exit called");
		});

		expect(() => runInfo("nonexistent", "en")).toThrow("process.exit called");
		expect(exitSpy).toHaveBeenCalledWith(1);

		exitSpy.mockRestore();
	});
});
