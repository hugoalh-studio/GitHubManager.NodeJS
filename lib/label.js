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
			require("./label/add.js")(...input.splice(1));
			break;
		case "delete":
			{
				let [repository, ...name] = input.splice(1);
				if (advancedDetermine.isString(repository) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
					break;
				};
				if (advancedDetermine.isArray(name) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "name" must be type of string (non-nullable)!`);
					break;
				};
				require("./label/delete.js")(repository, name);
			}
			break;
		case "deleteall":
			{
				let repository = input.splice(1);
				if (advancedDetermine.isArray(repository) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
					break;
				};
				require("./label/deleteall.js")(repository);
			}
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
			{
				let [source, ...target] = input.splice(1);
				if (advancedDetermine.isString(source) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "source" must be type of string (non-nullable)!`);
					break;
				};
				if (advancedDetermine.isArray(target) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "target" must be type of string (non-nullable)!`);
					break;
				};
				require("./label/merge.js")(source, target);
			}
			break;
		case "replace":
			{
				let [source, ...target] = input.splice(1);
				if (advancedDetermine.isString(source) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "source" must be type of string (non-nullable)!`);
					break;
				};
				if (advancedDetermine.isArray(target) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "target" must be type of string (non-nullable)!`);
					break;
				};
				require("./label/replace.js")(source, target);
			}
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
			require("./help.js")();
			break;
	};
};
