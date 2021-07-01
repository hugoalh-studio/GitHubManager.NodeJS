const internalConsole = require("../internal/console.js"),
	languageService = require("../language/main.js");
/**
 * @private
 * @function directLabel
 * @param {object} commandLine
 * @returns
 */
function directLabel(commandLine) {
	let method = commandLine.action[1] || "";
	if (method.search(/^(add|create)-?a?cr(oss)?$/giu) === 0) {
		return require("../action/label/add-across.js")(commandLine);
	};
	if (method.search(/^(add|create)(-?one)?$/giu) === 0) {
		return require("../action/label/add-one.js")(commandLine);
	};
	if (method.search(/^(del(ete)?|remove|rm)-?a?cr(oss)?$/giu) === 0) {
		return require("../action/label/delete-across.js")(commandLine);
	};
	if (method.search(/^(del(ete)?|remove|rm)-?all$/giu) === 0) {
		return require("../action/label/delete-all.js")(commandLine);
	};
	if (method.search(/^(del(ete)?|remove|rm)(-?one)?$/giu) === 0) {
		return require("../action/label/delete-one.js")(commandLine);
	};
	if (method.search(/^list$/giu) === 0) {
		return require("../action/label/list.js")(commandLine, false);
	};
	if (method.search(/^pull-?merge$/giu) === 0) {
		return require("../action/label/pull-merge.js")(commandLine);
	};
	if (method.search(/^push-?merge$/giu) === 0) {
		return require("../action/label/push-merge.js")(commandLine);
	};
	if (method.search(/^pull-?replace$/giu) === 0) {
		return require("../action/label/pull-replace.js")(commandLine);
	};
	if (method.search(/^push-?replace$/giu) === 0) {
		return require("../action/label/push-replace.js")(commandLine);
	};
	if (method.search(/^reset$/giu) === 0) {
		return require("../action/label/reset.js")(commandLine);
	};
	internalConsole.error(languageService.errorUnknownCommand, { command: `label ${method}` });
	process.exit(0);
};
module.exports = directLabel;
