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
			require("./secret/add.js")(...remain);
			break;
		case "delete":
			require("./secret/delete.js")(...remain);
			break;
		case "deleteall":
			require("./secret/deleteall.js")(...remain);
			break;
		case "listmask":
		case "list":
			require("./secret/listmask.js")(remain[0], false);
			break;
		case "listunmask":
			require("./secret/listunmask.js")(remain[0], false);
			break;
		case "merge":
			require("./secret/merge.js")(...remain);
			break;
		case "replace":
			require("./secret/replace.js")(...remain);
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
			require("./help.js")();
			break;
	};
};
