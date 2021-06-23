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
	if (
		method.search(/^add(-?one)?$/giu) === 0 ||
		method.search(/^create(-?one)?$/giu) === 0
	) {
		return require("../action/label/add.js")(commandLine);
	};
	if (
		method.search(/^del(ete)?(-?one)?$/giu) === 0 ||
		method.search(/^remove(-?one)?$/giu) === 0 ||
		method.search(/^rm(-?one)?$/giu) === 0
	) {
		return require("../action/label/delete.js")(commandLine);
	};
	if (
		method.search(/^del(ete)?-?a?cr(oss)?$/giu) === 0 ||
		method.search(/^remove-?a?cr(oss)?$/giu) === 0 ||
		method.search(/^rm-?a?cr(oss)?$/giu) === 0
	) {
		return require("../action/label/delete-across.js")(commandLine);
	};
	if (
		method.search(/^del(ete)?-?all$/giu) === 0 ||
		method.search(/^remove-?all$/giu) === 0 ||
		method.search(/^rm-?all$/giu) === 0
	) {
		return require("../action/label/delete-all.js")(commandLine);
	};
	switch (method.toLowerCase()) {
		case "list":
			return require("../action/label/list.js")(commandLine, false);
		case "pullmerge":
		case "pull":
			return require("../action/label/pull-merge.js")(commandLine);
		case "pushmerge":
		case "push":
			return require("../action/label/push-merge.js")(commandLine);
		case "replace":
			return require("../action/label/push-replace.js")(commandLine);
		case "reset":
			return require("../action/label/reset.js")(commandLine);
		default:
			internalConsole.error(`${languageService.errorUnknownCommand_1}label ${method}${languageService.errorUnknownCommand_2}`);
			process.exit((commandLine.flag.includes("ghaction") === true) ? 1 : 0);
	};
};
module.exports = directLabel;
