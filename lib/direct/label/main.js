const chalk = require("chalk");
function label(input) {
	let method = input.line[1] || "",
		remain = input.line.splice(2);
	switch (method.toLowerCase()) {
		case "add":
		case "create":
			return require("../../action/label/add.js")(...remain);
		case "delete":
		case "del":
		case "remove":
		case "rm":
			return require("../../action/label/delete.js")(...remain);
		case "deleteall":
		case "delall":
		case "removeall":
		case "rmall":
			return require("../../action/label/delete-all.js")(...remain);
		case "deletecross":
		case "delcr":
		case "delcross":
		case "deletecr":
		case "removecr":
		case "removecross":
		case "rmcr":
		case "rmcross":
			return require("../../action/label/delete-across.js")(...remain);
		case "list":
			return require("../../action/label/list.js")(remain[0], false);
		case "pullmerge":
		case "pull":
			return require("../../action/label/pull-merge.js")(...remain);
		case "pushmerge":
		case "push":
			return require("../../action/label/push-merge.js")(...remain);
		case "replace":
			return require("../../action/label/push-replace.js")(...remain);
		case "reset":
			return require("../../action/label/push-replace.js")("default", ...remain);
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list.`);
			break;
	};
};
module.exports = label;
