const ghmConsole = require("../internal/console.js"),
	ghmLanguage = require("../language/main.js");
/**
 * @private
 * @function directAccount
 * @param {object} commandLine
 * @returns
 */
function directAccount(commandLine) {
	let method = commandLine.action[1] || "";
	if (method.search(/^(rate-?)?limit$/giu) === 0) {
		return require("../action/account/rate-limit.js")(commandLine);
	};
	if (method.search(/^(log|sign)-?in$/giu) === 0) {
		return require("../action/account/sign-in.js")(commandLine);
	};
	if (method.search(/^(log|sign)-?out$/giu) === 0) {
		return require("../action/account/sign-out.js")(commandLine);
	};
	if (method.search(/^who(-?am-?i)?$/giu) === 0) {
		return require("../action/account/who-am-i.js")(commandLine);
	};
	ghmConsole.error(ghmLanguage.errorUnknownCommand, { command: `account ${method}` });
	process.exit(0);
};
module.exports = directAccount;
