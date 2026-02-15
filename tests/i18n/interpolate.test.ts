import { describe, expect, it } from "bun:test";

import { interpolate } from "@/i18n/index";

describe("interpolate", () => {
	it("should replace a single placeholder", () => {
		const result = interpolate("Hello {name}!", { name: "World" });
		expect(result).toBe("Hello World!");
	});

	it("should replace multiple placeholders", () => {
		const result = interpolate("{greeting} {name}, welcome to {place}!", {
			greeting: "Hello",
			name: "Alice",
			place: "Wonderland",
		});
		expect(result).toBe("Hello Alice, welcome to Wonderland!");
	});

	it("should return the template unchanged when no placeholders are present", () => {
		const result = interpolate("No placeholders here.", { key: "value" });
		expect(result).toBe("No placeholders here.");
	});

	it("should leave unknown placeholders intact", () => {
		const result = interpolate("Hello {name}, age is {age}.", {
			name: "Bob",
		});
		expect(result).toBe("Hello Bob, age is {age}.");
	});
});
