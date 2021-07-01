const advancedDetermine = require("@hugoalh/advanced-determine"),
	languageService = require("../../language/main.js"),
	localStorage = require("../../internal/local-storage.js");
/**
 * @private
 * @function actionAccountSignIn
 * @param {object} commandLine
 * @returns {any}
 */
function actionAccountSignIn(commandLine) {
	let token = commandLine.action[2] || "";
	if (advancedDetermine.isString(token) !== true) {
		throw new TypeError(`Argument "token" must be type of string (non-nullable)!`);
	};
	
	localStorage.write("account", token);
	return require("./who-am-i.js")();
};
module.exports = actionAccountSignIn;
