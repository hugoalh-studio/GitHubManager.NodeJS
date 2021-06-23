const internalConsole = require("../internal/console.js"),
	languageService = require("../language/main.js");
/**
 * @private
 * @function directLabel
 * @param {object} commandLine
 * @returns
 */
function directLabel(commandLine) {
	let method = commandLine.action[1] || "_";
	switch (method.toLowerCase()) {
		case "add-one":
		case "add":
		case "addone":
		case "create-one":
		case "create":
		case "createone":
			return require("../action/label/add.js")(commandLine);
		case "del-one":
		case "del":
		case "delete-one":
		case "delete":
		case "deleteone":
		case "delone":
		case "remove-one":
		case "remove":
		case "removeone":
		case "rm-one":
		case "rm":
		case "rmo":
		case "rmone":
			return require("../action/label/delete.js")(commandLine);
		case "deletecross":
		case "deleteacross":
		case "delete-cross":
		case "delete-across":
		case "delcr":
		case "delacr":
		case "delcross":
		case "delacross":
		case "del-cr":
		case "del-acr":
		case "del-cross":
		case "del-across":
		case "deletecr":
		case "deleteacr":
		case "removecr":
		case "removecross":
		case "rmcr":
		case "rmcross":
		case "rmacr":
		case "rmacross":
			return require("../action/label/delete-across.js")(commandLine);
		case "del-all":
		case "delall":
		case "delete-all":
		case "deleteall":
		case "remove-all":
		case "removeall":
		case "rm-all":
		case "rma":
		case "rmall":
			return require("../action/label/delete-all.js")(commandLine);
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
