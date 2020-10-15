#!/usr/bin/env node
/*==================
[NodeJS] GitHub Manager
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk");
let input = process.argv.slice(2);
let method = input[0] || "help",
	remain = input.slice(1);
switch (method.toLowerCase()) {
	case "account":
		require("../lib/account.js")(remain);
		break;
	case "label":
		require("../lib/label.js")(remain);
		break;
	case "secret":
		require("../lib/secret.js")(remain);
		break;
	default:
		console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
	case "help":
	case "h":
		require("../lib/help.js")();
		break;
};
