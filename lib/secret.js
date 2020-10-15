/*==================
[NodeJS] GitHub Manager - Secret
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
/**
 * @private
 * @function main
 * @param {string[]} input
 * @returns {void}
 */
module.exports = function main(input) {
	let method = input[0] || "";
	switch (method.toLowerCase()) {
		case "add":
			{
				let [repository, name, value, ...bin] = input.splice(1);
				if (advancedDetermine.isString(repository) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
					break;
				};
				if (advancedDetermine.isString(name) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "name" must be type of string (non-nullable)!`);
					break;
				};
				if (advancedDetermine.isString(value) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "value" must be type of string (non-nullable)!`);
					break;
				};
				require("./secret/add.js")(repository, name, value);
			}
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
				require("./secret/delete.js")(repository, name);
			}
			break;
		case "deleteall":
			{
				let repository = input.splice(1);
				if (advancedDetermine.isArray(repository) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
					break;
				};
				require("./secret/deleteall.js")(repository);
			}
			break;
		case "list":
			{
				let repository = input[1];
				if (advancedDetermine.isString(repository) !== true) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
					break;
				};
				require("./secret/list.js")(repository);
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
				require("./secret/merge.js")(source, target);
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
				require("./secret/replace.js")(source, target);
			}
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command!`);
			require("./help.js")();
			break;
	};
};
