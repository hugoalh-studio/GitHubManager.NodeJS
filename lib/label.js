/*==================
[NodeJS] GitHub Manager - Label
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk");
module.exports = function main(input) {
	let method = input[0] || "",
		remain = input.splice(1);
	switch (method.toLowerCase()) {
		case "add":
			return require("./label/add.js")(...remain);
		case "delete":
		case "del":
			return require("./label/delete.js")(...remain);
		case "deleteall":
		case "delall":
			return require("./label/deleteall.js")(...remain);
		case "deletecross":
		case "delcr":
		case "delcross":
		case "deletecr":
			return require("./label/deletecross.js")(...remain);
		case "list":
			return require("./label/list.js")(remain[0], false);
		case "pullmerge":
		case "pull":
			return require("./label/pullmerge.js")(...remain);
		case "pushmerge":
		case "push":
			return require("./label/pushmerge.js")(...remain);
		case "replace":
			return require("./label/replace.js")(...remain);
		case "reset":
			return require("./label/replace.js")("default", ...remain);
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list. ([NodeJS] GitHub Manager)`);
			break;
	};
};
