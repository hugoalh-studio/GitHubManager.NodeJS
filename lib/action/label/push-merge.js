const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	labelList = require("./list.js");
function labelPushMergeLocal(sourceData) {
	const localStorage = require("../../internal/local-storage.js");
	let targetData = localStorage.read("label");
	let result = Object.assign({}, targetData, sourceData);
	localStorage.write("label", result);
};
async function labelPushMergeNetwork(sourceData, targetRepositories) {
	const labelAdd = require("./add.js"),
		labelEdit = require("./edit.js");
	let sourceDataKey = Object.keys(sourceData);
	for (let index = 0; index < targetRepositories.length; index++) {
		let targetRepository = targetRepositories[index];
		let dataAdd = {},
			dataEdit = {},
			targetData = await labelList(targetRepository, true);
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
};
async function labelPushMerge(sourceRepository, ...targetRepositories) {
	if (advancedDetermine.isString(sourceRepository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" must be type of string (non-nullable)!`);
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
			if (sourceRepository.search(/^@[\w\d\-._]+$/giu) === 0) {
				throw new Error(`Label is not support organization!`);
				process.exit(0);
			};
			if (sourceRepository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) !== 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository"'s value is not match the require pattern!`);
				process.exit(0);
			};
			break;
	};
	let targetLocalStorage = false,
		targetNetworkRepositoriesQueue = [];
	targetRepositories.forEach((targetRepository) => {
		switch (targetRepository.toLowerCase()) {
			case "def":
			case "default":
				console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label!`);
				break;
			case "local-storage":
			case "local":
			case "localstorage":
			case "ls":
			case "storage":
				if (sourceRepository === "localstorage") {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" and "targetRepository" have the same value!`);
				} else {
					targetLocalStorage = true;
				};
				break;
			default:
				if (sourceRepository === targetRepository) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "sourceRepository" and "targetRepository" have the same value!`);
					break;
				};
				if (targetRepository.search(/^@[\w\d\-._]+$/giu) === 0) {
					throw new Error(`Label is not support organization!`);
					break;
				};
				if (targetRepository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
					targetNetworkRepositoriesQueue.push(targetRepository);
					break;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository"'s value is not match the require pattern!`);
				break;
		};
	});
	let sourceData = await labelList(sourceRepository, true);
	if (targetLocalStorage === true) {
		labelPushMergeLocal(sourceData);
	};
	if (targetNetworkRepositoriesQueue.length > 0) {
		return labelPushMergeNetwork(sourceData, targetNetworkRepositoriesQueue);
	};
};
module.exports = labelPushMerge;
