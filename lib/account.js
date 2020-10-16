/*==================
[NodeJS] GitHub Manager - Account
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	localStorage = require("./localstorage.js");
module.exports = function main(input) {
	let method = input[0] || "";
	switch (method.toLowerCase()) {
		case "signin":
		case "login":
			let token = input[1];
			if (advancedDetermine.isString(token) !== true) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "token" must be type of string (non-nullable)!`);
				break;
			};
			localStorage.write("account", token);
			break;
		case "signout":
		case "logout":
			localStorage.write("account", "");
			break;
		case "limit":
			return require("./account/limit.js")();
			break;
		case "whoami":
		case "who":
			return require("./account/whoami.js")();
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
			require("./help.js")();
			break;
	};
};
