const advancedDetermine = require("@hugoalh/advanced-determine"),
	languageService = require("../../language/main.js"),
	localStorage = require("../../internal/local-storage.js");
/**
 * @private
 * @function actionAccountSignIn
 * @param {string} [token=""]
 * @returns 
 */
function actionAccountSignIn(token = "") {
	if (advancedDetermine.isString(token) !== true) {
		throw new TypeError(`Argument "token" must be type of string (non-nullable)!`);
	};
	localStorage.write("account", token);
	return require("./who-am-i.js")();
};
module.exports = actionAccountSignIn;
