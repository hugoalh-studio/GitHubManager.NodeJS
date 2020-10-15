/*==================
[NodeJS] GitHub Manager - Account
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	accountLocalStorage = require("./account/localstorage.js"),
	chalk = require("chalk");
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
			accountLocalStorage.write(token);
			break;
		case "signout":
		case "logout":
			accountLocalStorage.write("");
			break;
		case "limit":
			break;
		case "whoami":
		case "who":
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
			require("./help.js")();
			break;
	};
};
function limit() {
	let data = client.get().rateLimit.get();
	return data.data.resources;
};
