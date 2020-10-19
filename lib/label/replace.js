/*==================
[NodeJS] GitHub Manager - Label - Replace
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	labelList = require("./list.js");
function local(sourceRepository, sourceData) {
	if (typeof sourceData === "undefined") {
		sourceData = labelList(sourceRepository, true);
	};
	const localStorage = require("../localstorage.js");
	localStorage.write("label", JSON.stringify(sourceData));
};
function network(sourceRepository, sourceData, repositoryQueue) {
	const labelAdd = require("./add.js"),
		labelDelete = require("./delete.js"),
		labelEdit = require("./edit.js");
	if (typeof sourceData === "undefined") {
		sourceData = labelList(sourceRepository, true);
	};
	let sourceDataKey = Object.keys(sourceData);
	repositoryQueue.forEach((repository) => {
		let dataAdd = {},
			dataDelete = [],
			dataEdit = {},
			targetData = labelList(repository, true);
		let targetDataKey = Object.keys(targetData);
		targetDataKey.forEach((targetKey) => {
			if (sourceDataKey.includes(targetKey) === true) {
				let sourceColor = sourceData[targetKey]["color"],
					sourceDescription = sourceData[targetKey]["description"],
					targetColor = targetData[targetKey]["color"],
					targetDescription = targetData[targetKey]["description"];
				if (
					sourceColor !== targetColor ||
					sourceDescription !== targetDescription
				) {
					dataEdit[targetKey] = {
						"color": sourceColor,
						"description": sourceDescription
					};
				};
			} else {
				dataDelete.push(targetKey);
			};
		});
		sourceDataKey.forEach((sourceKey) => {
			if (targetDataKey.includes(sourceKey) === false) {
				dataAdd[sourceKey] = {
					"color": sourceData[sourceKey]["color"],
					"description": sourceData[sourceKey]["description"]
				};
			};
		});
		if (advancedDetermine.isObjectPair(dataAdd) === true) {
			Object.keys(dataAdd).forEach((key) => {
				labelAdd(repository, key, dataAdd[key]["color"], dataAdd[key]["description"]);
			});
		};
		if (advancedDetermine.isArray(dataDelete) === true) {
			labelDelete(repository, ...dataDelete);
		};
		if (advancedDetermine.isObjectPair(dataEdit) === true) {
			Object.keys(dataEdit).forEach((key) => {
				labelEdit(repository, key, dataEdit[key]["color"], dataEdit[key]["description"]);
			});
		};
	});
};
function main(sourceRepository, ...targetRepositories) {
	if (advancedDetermine.isString(sourceRepository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let sourceData;
	switch (sourceRepository.toLowerCase()) {
		case "default":
		case "def":
			sourceRepository = "default";
			sourceData = labelList(sourceRepository, true);
			break;
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			sourceRepository = "localstorage";
			sourceData = labelList(sourceRepository, true);
			break;
		default:
			if (sourceRepository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) === 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
				process.exit(0);
			};
			if (sourceRepository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) !== 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				process.exit(0);
			};
			break;
	};
	let networkRepositoryQueue = [];
	targetRepositories.forEach((targetRepository) => {
		if (advancedDetermine.isString(targetRepository) !== true) {
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
			process.exit(0);
		};
		switch (targetRepository.toLowerCase()) {
			case "default":
			case "def":
				console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label! ([NodeJS] GitHub Manager)`);
				break;
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				if (sourceRepository.toLowerCase() === "localstorage") {
					console.warn(`${chalk.bgYellow.black.bold("WARN")} Argument "sourceRepository" and "targetRepository" have the same value! ([NodeJS] GitHub Manager)`);
					break;
				};
				local(sourceRepository, sourceData);
				break;
			default:
				if (targetRepository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) !== 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
					break;
				};
				if (targetRepository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) === 0) {
					networkRepositoryQueue.push(targetRepository);
					break;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				break;
		};
	});
	if (networkRepositoryQueue.length > 0) {
		network(sourceRepository, sourceData, networkRepositoryQueue);
	};
};
module.exports = main;
