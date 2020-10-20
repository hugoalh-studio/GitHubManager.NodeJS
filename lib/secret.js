/*==================
[NodeJS] GitHub Manager - Secret
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk");
module.exports = function main(input) {
	let method = input[0] || "",
		remain = input.splice(1);
	switch (method.toLowerCase()) {
		case "add":
			return require("./secret/add.js")(...remain);
		case "delete":
		case "del":
			return require("./secret/delete.js")(...remain);
		case "deleteall":
		case "delall":
			return require("./secret/deleteall.js")(...remain);
		case "listmask":
		case "list":
			return require("./secret/listmask.js")(remain[0], false);
		case "listunmask":
			return require("./secret/listunmask.js")(remain[0], false);
		case "merge":
			return require("./secret/merge.js")(...remain);
		case "replace":
			return require("./secret/replace.js")(...remain);
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
			return require("./help.js")();
	};
};
