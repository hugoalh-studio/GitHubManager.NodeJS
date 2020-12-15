#!/usr/bin/env node
/*==================
[NodeJS] GitHub Manager
	Language:
		NodeJS/14.15.0
==================*/
const chalk = require("chalk"),
	cliArgumentParser = require("@hugoalh/cli-argument-parser");
let input = cliArgumentParser.parse(process.argv.slice(2));
if (input.unparseable.length > 0) {
	console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown input:
${input.unparseable.join("\n")}
([NodeJS] GitHub Manager)`);
	process.exit(0);
};
let method = input.line[0] || "";
switch (method.toLowerCase()) {
	case "":
		require("../lib/wizard.js")();
		break;
	case "account":
	case "acc":
		require("../lib/method/account.js")(input);
		break;
	case "help":
	case "h":
		require("../lib/method/help.js")(input);
		break;
	case "label":
		require("../lib/method/label.js")(input);
		break;
	case "localstorage":
	case "local":
	case "ls":
	case "storage":
		require("../lib/method/localstorage/service.js.js")(input);
		break;
	case "secret":
		require("../lib/method/secret.js")(input);
		break;
	default:
		console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list. ([NodeJS] GitHub Manager)`);
		break;
};
