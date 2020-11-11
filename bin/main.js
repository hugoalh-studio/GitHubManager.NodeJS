#!/usr/bin/env node
/*==================
[NodeJS] GitHub Manager
	Language:
		NodeJS/10.13.0
==================*/
/*
const chalk = require("chalk"),
	cliArgumentParser = require("@hugoalh/cli-argument-parser");
let input = cliArgumentParser.parse(process.argv.slice(2));
if (input.unparseable.length > 0) {
	console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown input "${input.unparseable.join("\", \"")}"! ([NodeJS] GitHub Manager)`);
	process.exit(0);
};
*/
const chalk = require("chalk");
let input = process.argv.slice(2);
let submodule = input[0] || "help",
	data = input.slice(1);
switch (submodule.toLowerCase()) {
	/*
	case "":
		require("../lib/wizard.js")(input);
		break;
	*/
	case "account":
	case "acc":
		require("../lib/account.js")(data/* input */);
		break;
	case "help":
	case "h":
		require("../lib/help.js")(data/* input */);
		break;
	case "label":
		require("../lib/label.js")(data/* input */);
		break;
	case "localstorage":
	case "local":
	case "ls":
	case "storage":
		require("../lib/localstorage/service.js")(data/* input */);
		break;
	case "secret":
		require("../lib/secret.js")(data/* input */);
		break;
	default:
		console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list. ([NodeJS] GitHub Manager)`);
		break;
};
