#!/usr/bin/env node
const cliArgumentParser = require("@hugoalh/cli-argument-parser"),
	internalConsole = require("../lib/internal/console.js");
let input = cliArgumentParser.parse(process.argv.slice(2));
if (input.unparseable.length > 0) {
	internalConsole.error(`Unknown input: ${input.unparseable.join("\n")}`);
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
		internalConsole.error(`Unknown command! Use \`help\` to view the command list.`);
		process.exit(0);
};
