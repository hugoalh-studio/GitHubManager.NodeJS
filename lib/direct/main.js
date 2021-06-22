const internalConsole = require("../internal/console.js"),
	languageService = require("../language/main.js");
/**
 * @private
 * @function direct
 * @param {object} input
 * @returns {void}
 */
function direct(input) {
	let method = input.action[0] || "";
	switch (method.toLowerCase()) {
		case "acc":
		case "account":
			require("./account/main.js")(input);
			break;
		case "h":
		case "help":
			require("../action/help.js")(input);
			break;
		case "label":
			require("./label/main.js")(input);
			break;
		case "local-storage":
		case "local":
		case "localstorage":
		case "ls":
		case "storage":
			require("./local-storage.js")(input);
			break;
		case "secret":
			require("./secret/main.js")(input);
			break;
		default:
			internalConsole.error(`Unknown command "${method}"! Use \`help\` to view the command list.`);
			process.exit(0);
	};
};
module.exports = direct;
