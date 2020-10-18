/*==================
[NodeJS] GitHub Manager - Label - Replace
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function network(repositoryQueue) {
	const labelAdd = require("./add.js"),
		labelDelete = require("./delete.js"),
		labelList = require("./list.js");
	repositoryQueue.forEach((repository) => {
		let dataOriginal = labelList(repository, true),
		dataAdd = {},
		dataDelete = {};
		Object.keys(labelDefault).forEach((key) => {
			let defaultName = key,
			defaultColor = labelDefault[key]["color"],
			defaultDescription = labelDefault[key]["description"];
		})
	});
};
function main(sourceRepository, ...targetRepositories) {
	let networkRepositoryQueue = [];
	targetRepositories.forEach((targetRepository) => {
		if (advancedDetermine.isString(targetRepository) !== true) {
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
			process.exit(0);
		};
		switch (targetRepository.toLowerCase()) {
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				const localStorage = require("../localstorage.js");
				localStorage.write("label", JSON.stringify(labelDefault));
				break;
			default:
				if (targetRepository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) !== 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
					break;
				};
				if (targetRepository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) === 0) {
					networkRepositoryQueue.push(targetRepository);
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
