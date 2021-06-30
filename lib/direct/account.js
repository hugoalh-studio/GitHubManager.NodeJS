const internalConsole = require("../internal/console.js"),
	languageService = require("../language/main.js"),
	sessionProtection = require("../internal/session-protection.js");
/**
 * @private
 * @function directAccount
 * @param {object} commandLine
 * @returns
 */
function directAccount(commandLine) {
	sessionProtection(commandLine);
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
	internalConsole.error(languageService.errorUnknownCommand, { command: `account ${method}` });
	process.exit(0);
};
module.exports = directAccount;
