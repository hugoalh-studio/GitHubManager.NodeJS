/*==================
[NodeJS] GitHub Manager - Label - Replace
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	labelList = require("./list.js");
function local(sourceData) {
	const localStorage = require("../localstorage.js");
	localStorage.write("label", JSON.stringify(sourceData));
};
async function network(sourceData, targetRepositoryQueue) {
	const labelAdd = require("./add.js"),
		labelDelete = require("./delete.js"),
		labelEdit = require("./edit.js");
	let sourceDataKey = Object.keys(sourceData);
	for (let index = 0; index < targetRepositoryQueue.length; index++) {
		let repository = targetRepositoryQueue[index];
		let dataAdd = {},
			dataDelete = [],
			dataEdit = {},
			targetData = await labelList(repository, true);
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
						"description": sourceDescription || ""
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
					"description": sourceData[sourceKey]["description"] || ""
				};
			};
		});
		if (advancedDetermine.isObjectPair(dataAdd) === true) {
			let dataAddKey = Object.keys(dataAdd);
			for (let indexAdd = 0; indexAdd < dataAddKey.length; indexAdd++) {
				let key = dataAddKey[indexAdd];
				await labelAdd(repository, key, dataAdd[key]["color"], dataAdd[key]["description"]);
			};
		};
		if (advancedDetermine.isArray(dataDelete) === true) {
			await labelDelete(repository, ...dataDelete);
		};
		if (advancedDetermine.isObjectPair(dataEdit) === true) {
			let dataEditKey = Object.keys(dataEdit);
			for (let indexEdit = 0; indexEdit < dataEditKey.length; indexEdit++) {
				let key = dataEditKey[indexEdit];
				await labelEdit(repository, key, dataEdit[key]["color"], dataEdit[key]["description"]);
			};
		};
	};
};
async function main(sourceRepository, ...targetRepositories) {
	if (advancedDetermine.isString(sourceRepository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (sourceRepository.toLowerCase()) {
		case "default":
		case "def":
			sourceRepository = "default";
			break;
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			sourceRepository = "localstorage";
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
	let isTargetLocalStorage = false,
		targetNetworkRepositoryQueue = [];
	for (let index = 0; index < targetRepositories.length; index++) {
		let targetRepository = targetRepositories[index];
		/*
		if (advancedDetermine.isString(targetRepository) !== true) {
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
			process.exit(0);
		};
		*/
		switch (targetRepository.toLowerCase()) {
			case "default":
			case "def":
				console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label! ([NodeJS] GitHub Manager)`);
				continue;
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				if (sourceRepository === "localstorage") {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" and "targetRepository" have the same value! ([NodeJS] GitHub Manager)`);
				} else {
					isTargetLocalStorage = true;
				};
				continue;
			default:
				if (sourceRepository === targetRepository) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" and "targetRepository" have the same value! ([NodeJS] GitHub Manager)`);
					continue;
				};
				if (targetRepository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) === 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
					break;
				};
				if (targetRepository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) === 0) {
					targetNetworkRepositoryQueue.push(targetRepository);
					break;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				break;
		};
	};
	let sourceData = await labelList(sourceRepository, true);
	if (isTargetLocalStorage === true) {
		local(sourceData);
	};
	if (targetNetworkRepositoryQueue.length > 0) {
		return network(sourceData, targetNetworkRepositoryQueue);
	};
};
module.exports = main;
