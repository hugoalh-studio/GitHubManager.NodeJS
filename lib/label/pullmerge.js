/*==================
[NodeJS] GitHub Manager - Label - Pull Merge
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	labelList = require("./list.js");
async function local(targetData, sourceRepositoryQueue) {
	for (let index = 0; index < sourceRepositoryQueue.length; index++) {
		let repository = sourceRepositoryQueue[index];
		let sourceData = await labelList(repository, true);
		targetData = Object.assign({}, targetData, sourceData);
	};
	const localStorage = require("../localstorage.js");
	localStorage.write("label", JSON.stringify(targetData));
};
async function network(targetRepository, targetData, sourceRepositoryQueue) {
	const labelAdd = require("./add.js"),
		labelEdit = require("./edit.js");
	let dataAdd = {},
		dataEdit = {},
		targetDataKey = Object.keys(targetData);
	for (let index = 0; index < sourceRepositoryQueue.length; index++) {
		let repository = sourceRepositoryQueue[index];
		let sourceData = await labelList(repository, true);
		let sourceDataKey = Object.keys(sourceData);
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
	};
	if (advancedDetermine.isObjectPair(dataAdd) === true) {
		let dataAddKey = Object.keys(dataAdd);
		for (let indexAdd = 0; indexAdd < dataAddKey.length; indexAdd++) {
			let key = dataAddKey[indexAdd];
			await labelAdd(targetRepository, key, dataAdd[key]["color"], dataAdd[key]["description"]);
		};
	};
	if (advancedDetermine.isObjectPair(dataEdit) === true) {
		let dataEditKey = Object.keys(dataEdit);
		for (let indexEdit = 0; indexEdit < dataEditKey.length; indexEdit++) {
			let key = dataEditKey[indexEdit];
			await labelEdit(targetRepository, key, dataEdit[key]["color"], dataEdit[key]["description"]);
		};
	};
};
async function main(targetRepository, ...sourceRepositories) {
	if (advancedDetermine.isString(targetRepository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (targetRepository.toLowerCase()) {
		case "default":
		case "def":
			console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label! ([NodeJS] GitHub Manager)`);
			process.exit(0);
			break;
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			targetRepository = "localstorage";
			break;
		default:
			if (targetRepository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) === 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
				process.exit(0);
			};
			if (targetRepository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) !== 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				process.exit(0);
			};
			break;
	};
	let sourceRepositoryQueue = [];
	for (let index = 0; index < sourceRepositories.length; index++) {
		let sourceRepository = sourceRepositories[index];
		/*
		if (advancedDetermine.isString(sourceRepository) !== true) {
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
			process.exit(0);
		};
		*/
		switch (sourceRepository.toLowerCase()) {
			case "default":
			case "def":
				sourceRepositoryQueue.push("default");
				continue;
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				if (targetRepository === "localstorage") {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" and "targetRepository" have the same value! ([NodeJS] GitHub Manager)`);
				} else {
					sourceRepositoryQueue.push("localstorage");
				};
				continue;
			default:
				if (sourceRepository === targetRepository) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" and "targetRepository" have the same value! ([NodeJS] GitHub Manager)`);
					continue;
				};
				if (sourceRepository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) === 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
					continue;
				};
				if (sourceRepository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) === 0) {
					sourceRepositoryQueue.push(sourceRepository);
					continue;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				continue;
		};
	};
	let targetData = await labelList(targetRepository, true);
	if (targetRepository === "localstorage") {
		return local(targetData, sourceRepositoryQueue);
	};
	return network(targetRepository, targetData, sourceRepositoryQueue);
};
module.exports = main;
