/*==================
[NodeJS] GitHub Manager - Label - Reset
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	labelDefault = require("../label_default.js");
function network(repositoryQueue) {
	const labelAdd = require("./add.js"),
		labelDelete = require("./delete.js"),
		labelList = require("./list.js");
	repositoryQueue.forEach((repository) => {
		let dataOriginal = labelList(true, repository),
		dataAdd = {},
		dataDelete = {};
		Object.keys(labelDefault).forEach((key) => {
			let defaultName = key,
			defaultColor = labelDefault[key]["color"],
			defaultDescription = labelDefault[key]["description"];
		})
	});
};
function main(...repositories) {
	let networkRepositoryQueue = [];
	repositories.forEach((repository) => {
		if (advancedDetermine.isString(repository) !== true) {
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
			process.exit(0);
		};
		switch (repository.toLowerCase()) {
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				const localStorage = require("../localstorage.js");
				localStorage.write("label", JSON.stringify(labelDefault));
				break;
			default:
				if (repository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) !== 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
					break;
				};
				if (repository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) === 0) {
					networkRepositoryQueue.push(repository);
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				break;
		};
	});
	if (networkRepositoryQueue.length > 0) {
		network(networkRepositoryQueue);
	};
};
module.exports = main;
