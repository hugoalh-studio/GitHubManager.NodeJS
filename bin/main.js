#!/usr/bin/env node
const commandLineParser = require("@hugoalh/command-line-parser"),
	header = require("../lib/internal/header.js"),
	internalConsole = require("../lib/internal/console.js"),
	languageService = require("../lib/language/main.js");
console.log(header);
let input = commandLineParser(process.argv.slice(2));
if (input.fault.length > 0) {
	input.fault.forEach((element) => {
		internalConsole.error(`${languageService.errorUnknownInput_1}${element}${languageService.errorUnknownInput_2}`);
	});
	process.exit(0);
};
if (input.action.length > 0) {
	require("../lib/direct/main.js")(input);
} else {
	require("../lib/wizard/main.js")();
};
