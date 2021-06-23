const internalConsole = require("../internal/console.js"),
	languageService = require("../language/main.js");
/**
 * @private
 * @function directAccount
 * @param {object} commandLine
 * @returns
 */
function directAccount(commandLine) {
	let method = commandLine.action[1] || "_";
	if (method.search(/^(rate)?-?limit$/giu) === 0) {
		return require("../action/account/rate-limit.js")(commandLine);
	};
	if (method.search(/^(log|sign)-?in$/giu) === 0) {
		return require("../action/account/sign-in.js")(commandLine);
	};
	if (method.search(/^(log|sign)-?out$/giu) === 0) {
		const localStorage = require("../internal/local-storage.js");
		return localStorage.write("account", "");
	};
	if (method.search(/^who(-?am-?i)?$/giu) === 0) {
		return require("../action/account/who-am-i.js")(commandLine);
	};
	internalConsole.error(`${languageService.errorUnknownCommand_1}account ${method}${languageService.errorUnknownCommand_2}`);
	process.exit((commandLine.flag.includes("ghaction") === true) ? 1 : 0);
};
module.exports = directAccount;
