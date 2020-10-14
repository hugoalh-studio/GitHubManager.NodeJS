#!/usr/bin/env node
/*==================
[NodeJS] GitHub Manager
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk");
let [module, method, ...input] = process.argv.slice(2);
switch (module.toLowerCase()) {
	case "account":
		break;
	case "label":
		break;
	case "secret":
		break;
	default:
		console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
	case "h":
	case "help":
		require("./help.js")();
		break;
};
