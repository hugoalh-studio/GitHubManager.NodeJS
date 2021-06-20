#!/usr/bin/env node
const commandLineParser = require("@hugoalh/command-line-parser"),
	internalConsole = require("../lib/internal/console.js");
let input = commandLineParser(process.argv.slice(2));
if (input.fault.length > 0) {
	input.fault.forEach((element) => {
		internalConsole.error(`Unknown input "${element}"!`);
	});
	process.exit(0);
};
if (input.action.length > 0) {
	require("../lib/direct.js")(input);
};
require("../lib/wizard.js")();
