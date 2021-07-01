#!/usr/bin/env node
const commandLineParser = require("@hugoalh/command-line-parser"),
	header = require("../lib/internal/header.js"),
	internalConsole = require("../lib/internal/console.js"),
	internalFlag = require("../lib/internal/flag.js"),
	languageService = require("../lib/language/main.js");
let commandLine = commandLineParser(process.argv.slice(2));
if (commandLine.flag.includes("silent") === false) {
	console.log(header);
};
commandLine.fault.forEach((element) => {
	internalConsole.warning(languageService.warningUnknownInput, { input: element });
});
commandLine.flag.push(internalFlag.panel);
if (commandLine.action.length === 0 && commandLine.fault.length === 0 && commandLine.flag.length === 1 && Object.keys(commandLine.option).length === 0) {
	commandLine.flag.push(internalFlag.wizard);
	require("../lib/wizard.js")(commandLine);
} else {
	require("../lib/direct.js")(commandLine);
};
