/*==================
[NodeJS] GitHub Manager - Label
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk");
module.exports = function main(input) {
	let method = input[0] || "",
		remain = input.splice(1);
	switch (method.toLowerCase()) {
		case "add":
			return require("./label/add.js")(...remain);
		case "delete":
			return require("./label/delete.js")(...remain);
		case "deleteall":
			return require("./label/deleteall.js")(...remain);
		case "list":
			return require("./label/list.js")(remain[0], false);
		case "merge":
			return require("./label/merge.js")(...remain);
		case "replace":
			return require("./label/replace.js")(...remain);
		case "reset":
			return require("./label/replace.js")("default", ...remain);
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
			return require("./help.js")();
	};
};
