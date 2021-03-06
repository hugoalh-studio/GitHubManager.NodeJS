/*==================
[NodeJS] GitHub Manager - Account - Sign In
	Language:
		NodeJS/14.15.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	localStorage = require("../localstorage/internal.js");
function accountSignIn(token = "") {
	if (advancedDetermine.isString(token) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "token" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	localStorage.write("account", token);
	return require("./whoami.js")();
};
module.exports = accountSignIn;
