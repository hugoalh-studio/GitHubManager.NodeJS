const header = require("./internal/header.js"),
	internalConsole = require("../lib/internal/console.js"),
	languageService = require("./language/main.js");
function direct(input) {
	console.log(header);
	internalConsole.information(languageService.directModeTitle);
	let method = input.action[0] || "";
	switch (method.toLowerCase()) {
		case "a":
		case "acc":
		case "account":
			require("./direct/account.js")(input);
			break;
		case "h":
		case "help":
			require("./method/help.js")(input);
			break;
		case "label":
			require("./direct/label.js")(input);
			break;
		case "secret":
			require("./direct/secret.js")(input);
			break;
		default:
			internalConsole.error(`Unknown command "${method}"! Use \`help\` to view the command list.`);
			process.exit(0);
	};
};
module.exports = direct;
