const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	labelList = require("./list.js");
async function labelPullMergeLocal(targetData, sourceRepositories) {
	for (let index = 0; index < sourceRepositories.length; index++) {
		let sourceRepository = sourceRepositories[index];
		let sourceData = await labelList(sourceRepository, true);
		targetData = Object.assign({}, targetData, sourceData);
	};
	const localStorage = require("../localstorage/internal.js");
	localStorage.write("label", targetData);
};
async function labelPullMergeNetwork(targetRepository, targetData, sourceRepositories) {
	const labelAdd = require("./add.js"),
		labelEdit = require("./edit.js");
	let dataAdd = {},
		dataEdit = {},
		targetDataKey = Object.keys(targetData);
	for (let index = 0; index < sourceRepositories.length; index++) {
		let sourceRepository = sourceRepositories[index];
		let sourceData = await labelList(sourceRepository, true);
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
async function labelPullMerge(targetRepository, ...sourceRepositories) {
	if (advancedDetermine.isString(targetRepository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	switch (targetRepository.toLowerCase()) {
		case "default":
		case "def":
			console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label!`);
			process.exit(0);
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			targetRepository = "localstorage";
			break;
		default:
			if (targetRepository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label is not support organization!`);
				process.exit(0);
			};
			if (targetRepository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) !== 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository"'s value is not match the require pattern!`);
				process.exit(0);
			};
			break;
	};
	let sourceRepositoriesQueue = [];
	sourceRepositories.forEach((sourceRepository) => {
		switch (sourceRepository.toLowerCase()) {
			case "default":
			case "def":
				sourceRepositoriesQueue.push("default");
				break;
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				if (targetRepository === "localstorage") {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" and "targetRepository" have the same value!`);
				} else {
					sourceRepositoriesQueue.push("localstorage");
				};
				break;
			default:
				if (sourceRepository === targetRepository) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" and "targetRepository" have the same value!`);
					break;
				};
				if (sourceRepository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label is not support organization!`);
					break;
				};
				if (sourceRepository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
					sourceRepositoriesQueue.push(sourceRepository);
					break;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository"'s value is not match the require pattern!`);
				break;
		};
	});
	let targetData = await labelList(targetRepository, true);
	if (targetRepository === "localstorage") {
		return labelPullMergeLocal(targetData, sourceRepositoriesQueue);
	};
	return labelPullMergeNetwork(targetRepository, targetData, sourceRepositoriesQueue);
};
module.exports = labelPullMerge;
