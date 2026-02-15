#!/usr/bin/env bun

import { Command } from "commander";
import pc from "picocolors";

const ASCII_LOGO = `
  _     _                         _  ___ _
 | |   (_) ___ ___ _ __  ___  ___| |/ (_) |_
 | |   | |/ __/ _ \\ '_ \\/ __|/ _ \\ ' /| | __|
 | |___| | (_|  __/ | | \\__ \\  __/ . \\| | |_
 |_____|_|\\___\\___|_| |_|___/\\___|_|\\_\\_|\\__|
`;

const TAGLINE = "Choose, understand, and add the right license to your project.";

function displayBanner(): void {
	console.log(pc.cyan(ASCII_LOGO));
	console.log(pc.dim(TAGLINE));
	console.log();
}

const program = new Command();

program
	.name("licensekit")
	.version("0.1.0")
	.description(
		"The interactive CLI tool that helps you choose, understand, and add the right license to your project.",
	)
	.action((): void => {
		displayBanner();
		console.log(pc.dim(`v${program.version()}`));
		console.log();
		console.log("Coming soon...");
	});

program.parse();
