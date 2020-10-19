/*==================
[NodeJS] GitHub Manager - Secret - Delete All
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function network(repositories) {
	const labelDelete = require("./delete.js"),
		labelList = require("./list.js");
	repositories.forEach((repository) => {
		let data = labelList(repository, true);
		let names = Object.keys(data);
		labelDelete(repository, ...names);
	});
};
function main(...repositories) {
	let networkRepositories = [];
	repositories.forEach((repository) => {
		if (advancedDetermine.isString(repository) !== true) {
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
			process.exit(0);
		};
		switch (repository.toLowerCase()) {
			case "default":
			case "def":
				console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label! ([NodeJS] GitHub Manager)`);
				break;
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				const localStorage = require("../localstorage.js");
				localStorage.write("label", JSON.stringify({}));
				break;
			default:
				if (repository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) !== 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
					break;
				};
				if (repository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) === 0) {
					networkRepositories.push(repository);
					break;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				break;
		};
	});
	if (networkRepositories.length > 0) {
		network(networkRepositories);
	};
};
module.exports = main;
