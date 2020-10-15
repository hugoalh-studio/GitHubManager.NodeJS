/*==================
[NodeJS] GitHub Manager - Label
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
module.exports = function main(input) {
	let method = input[0] || "";
	switch (method.toLowerCase()) {
		case "add":
			break;
		case "delete":
			break;
		case "deleteall":
			break;
		case "list":
			{
				let repository = input[1];
				if (advancedDetermine.isString(repository) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
					break;
				};
				require("./label/list.js")(repository);
			}
			break;
		case "merge":
			break;
		case "replace":
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
			require("./help.js")();
			break;
	};
};
