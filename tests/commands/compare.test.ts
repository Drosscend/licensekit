import { describe, expect, it, spyOn } from "bun:test";

import { runCompare } from "@/commands/compare";

describe("runCompare", () => {
	it("should not throw for two valid licenses", () => {
		expect(() => runCompare("MIT", "Apache-2.0", "en")).not.toThrow();
	});

	it("should call process.exit when second license is unknown", () => {
		const exitSpy = spyOn(process, "exit").mockImplementation(() => {
			throw new Error("process.exit called");
		});

		expect(() => runCompare("MIT", "nonexistent", "en")).toThrow("process.exit called");
		expect(exitSpy).toHaveBeenCalledWith(1);

		exitSpy.mockRestore();
	});
});
