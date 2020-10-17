/*==================
[NodeJS] GitHub Manager - Label - Delete All
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function network(repositoryQueue) {
	const labelDelete = require("./delete.js"),
		labelList = require("./list.js");
	repositoryQueue.forEach((repository) => {
		let data = labelList(true, repository);
		Object.keys(data).forEach((key) => {
			labelDelete(repository, key);
		});
	});
};
function main(...repositories) {
	let networkRepositoryQueue = [];
	repositories.forEach((repository) => {
		if (advancedDetermine.isString(repository) !== true) {
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
			process.exit(0);
		};
		switch (repository.toLowerCase()) {
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				const localStorage = require("../localstorage.js");
				localStorage.write("label", JSON.stringify({}));
				break;
			default:
				if (repository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) !== 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization!`);
					break;
				};
				if (repository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) === 0) {
					networkRepositoryQueue.push(repository);
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern!`);
				break;
		};
	});
	if (networkRepositoryQueue.length > 0) {
		network(networkRepositoryQueue);
	};
};
module.exports = main;
