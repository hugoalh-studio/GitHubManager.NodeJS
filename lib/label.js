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
			require("./label/add.js")(...remain);
			break;
		case "delete":
			require("./label/delete.js")(...remain);
			break;
		case "deleteall":
			require("./label/deleteall.js")(...remain);
			break;
		case "list":
			require("./label/list.js")(remain[0]);
			break;
		case "merge":
			require("./label/merge.js")(...remain);
			break;
		case "replace":
			require("./label/replace.js")(...remain);
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
			require("./help.js")();
			break;
	};
};
