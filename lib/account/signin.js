/*==================
[NodeJS] GitHub Manager - Account - Sign In
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	localStorage = require("../localstorage.js");
module.exports = function main(token = "") {
	if (advancedDetermine.isString(token) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "token" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	localStorage.write("account", token);
	return require("./whoami.js")();
};
