const internalConsole = require("../internal/console.js"),
	languageService = require("../language/main.js");
/**
 * @private
 * @function direct
 * @param {object} commandLine
 * @returns
 */
function direct(commandLine) {
	let method = commandLine.action[0] || "_";
	if (method.search(/^acc(ount)?$/giu) === 0) {
		return require("./account.js")(commandLine);
	};
	if (method.search(/^h(elp)?$/giu) === 0) {
		return require("../action/help.js")(commandLine);
	};
	if (method.search(/^label$/giu) === 0) {
		return require("./label.js")(commandLine);
	};
	if (method.search(/^(l(ocal-?)?s(torage)?)|(local)|(storage)$/giu) === 0) {
		return require("./local-storage.js")(commandLine);
	};
	if (method.search(/^migrate$/giu) === 0) {
		return require("./migrate.js")(commandLine);
	};
	if (method.search(/^secret$/giu) === 0) {
		return require("./secret.js")(commandLine);
	};
	internalConsole.error(`${languageService.errorUnknownCommand_1}${method}${languageService.errorUnknownCommand_2}`);
	process.exit((commandLine.flag.includes("ghaction") === true) ? 1 : 0);
};
module.exports = direct;
