const internalConsole = require("./internal/console.js"),
	languageService = require("./language/main.js"),
	sessionProtection = require("./internal/session-protection.js");
/**
 * @private
 * @function direct
 * @param {object} commandLine
 * @returns
 */
function direct(commandLine) {
	sessionProtection(commandLine);
	let method = commandLine.action[0] || "";
	if (method.search(/^acc(ount)?$/giu) === 0) {
		return require("./direct/account.js")(commandLine);
	};
	if (method.search(/^h(elp)?$/giu) === 0) {
		return require("./action/help.js")(commandLine);
	};
	if (method.search(/^label$/giu) === 0) {
		return require("./direct/label.js")(commandLine);
	};
	if (method.search(/^((l(ocal-?)?s(torage)?)|(local)|(storage))$/giu) === 0) {
		return require("./direct/local-storage.js")(commandLine);
	};
	if (method.search(/^migrate$/giu) === 0) {
		return require("./migrate.js")(commandLine);
	};
	if (method.search(/^secret$/giu) === 0) {
		return require("./direct/secret.js")(commandLine);
	};
	internalConsole.error(languageService.errorUnknownCommand, { command: method });
	process.exit(0);
};
module.exports = direct;
