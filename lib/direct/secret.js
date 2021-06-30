const internalConsole = require("../internal/console.js"),
	languageService = require("../language/main.js"),
	sessionProtection = require("../internal/session-protection.js");
/**
 * @private
 * @function directSecret
 * @param {object} commandLine
 * @returns
 */
function directSecret(commandLine) {
	sessionProtection(commandLine);
	let method = commandLine.action[1] || "";
	if (method.search(/^(add|create)-?a?cr(oss)?$/giu) === 0) {
		return require("../action/secret/add-across.js")(commandLine);
	};
	if (method.search(/^(add|create)(-?one)?$/giu) === 0) {
		return require("../action/secret/add-one.js")(commandLine);
	};
	if (method.search(/^(del(ete)?|remove|rm)-?a?cr(oss)?$/giu) === 0) {
		return require("../action/secret/delete-across.js")(commandLine);
	};
	if (method.search(/^(del(ete)?|remove|rm)-?all$/giu) === 0) {
		return require("../action/secret/delete-all.js")(commandLine);
	};
	if (method.search(/^(del(ete)?|remove|rm)(-?one)?$/giu) === 0) {
		return require("../action/secret/delete-one.js")(commandLine);
	};
	if (method.search(/^list$/giu) === 0) {
		return require("../action/secret/list.js")(commandLine, false);
	};
	if (method.search(/^push-?merge$/giu) === 0) {
		return require("../action/secret/push-merge.js")(commandLine);
	};
	if (method.search(/^push-?replace$/giu) === 0) {
		return require("../action/secret/push-replace.js")(commandLine);
	};
	internalConsole.error(languageService.errorUnknownCommand, { command: `secret ${method}` });
	process.exit(0);
};
module.exports = directSecret;