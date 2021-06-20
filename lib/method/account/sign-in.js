const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../../internal/console.js"),
	localStorage = require("../localstorage/internal.js");
function accountSignIn(token = "") {
	if (advancedDetermine.isString(token) !== true) {
		internalConsole.error(`Argument "token" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	localStorage.write("account", token);
	return require("./who-am-i.js")();
};
module.exports = accountSignIn;
