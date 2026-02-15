#!/usr/bin/env node

import { Command } from "commander";

import { runCompare } from "@/commands/compare";
import { runInfo } from "@/commands/info";
import { runList } from "@/commands/list";
import { runWizard } from "@/commands/wizard";
import type { SupportedLanguage } from "@/types/cli";
import { isSupportedLanguage } from "@/utils/detect-language";

function parseLang(value: string | undefined): SupportedLanguage | undefined {
	if (value && isSupportedLanguage(value)) {
		return value;
	}
	return undefined;
}

const program = new Command();

program
	.name("licensekit")
	.version("0.1.1")
	.description(
		"The interactive CLI tool that helps you choose, understand, and add the right license to your project.",
	)
	.option("-a, --author <name>", "author name for the license")
	.option("-y, --year <year>", "copyright year")
	.option("-o, --output <path>", "output path for the LICENSE file", "./LICENSE")
	.option("-l, --lang <lang>", "language: en or fr")
	.action(async (opts): Promise<void> => {
		await runWizard({
			author: opts.author,
			year: opts.year,
			output: opts.output,
			lang: parseLang(opts.lang),
		});
	});

program
	.command("list")
	.description("List all available licenses grouped by category")
	.action((): void => {
		const opts = program.opts();
		runList(parseLang(opts.lang));
	});

program
	.command("info <license>")
	.description("Show details about a specific license")
	.action((license: string): void => {
		const opts = program.opts();
		runInfo(license, parseLang(opts.lang));
	});

program
	.command("compare <licenseA> <licenseB>")
	.description("Compare two licenses side by side")
	.action((licenseA: string, licenseB: string): void => {
		const opts = program.opts();
		runCompare(licenseA, licenseB, parseLang(opts.lang));
	});

program.parse();
