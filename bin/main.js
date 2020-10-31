#!/usr/bin/env node
/*==================
[NodeJS] GitHub Manager
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk");
let input = process.argv.slice(2);
let submodule = input[0] || "help",
	data = input.slice(1);
switch (submodule.toLowerCase()) {
	case "account":
	case "acc":
		require("../lib/account.js")(data);
		break;
	case "help":
	case "h":
		require("../lib/help.js")();
		break;
	case "label":
		require("../lib/label.js")(data);
		break;
	case "localstorage":
	case "local":
	case "ls":
	case "storage":
		require("../lib/localstorage/service.js")(data);
		break;
	case "secret":
		require("../lib/secret.js")(data);
		break;
	default:
		console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list. ([NodeJS] GitHub Manager)`);
		break;
};
