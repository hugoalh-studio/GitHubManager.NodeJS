const actionLabelAdd = require("./add.js"),
	actionLabelEdit = require("./edit.js"),
	actionLabelList = require("./list.js"),
	advancedDetermine = require("@hugoalh/advanced-determine");
async function actionLabelPullMergeLocalStorage(targetData, sources) {
	for (let index = 0; index < sources.length; index++) {
		let source = sources[index];
		let sourceData = await actionLabelList(source, true);
		targetData = Object.assign({}, targetData, sourceData);
	};
	const localStorage = require("../../internal/local-storage.js");
	localStorage.write("label", targetData);
};
async function actionLabelPullMergeNetworkRepository(target, targetData, sources) {
	let dataAdd = {},
		dataEdit = {},
		targetDataKey = Object.keys(targetData);
	for (let index = 0; index < sources.length; index++) {
		let source = sources[index];
		let sourceData = await actionLabelList(source, true);
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
			await actionLabelAdd(target, key, dataAdd[key]["color"], dataAdd[key]["description"]);
		};
	};
	if (advancedDetermine.isObjectPair(dataEdit) === true) {
		let dataEditKey = Object.keys(dataEdit);
		for (let indexEdit = 0; indexEdit < dataEditKey.length; indexEdit++) {
			let key = dataEditKey[indexEdit];
			await actionLabelEdit(target, key, dataEdit[key]["color"], dataEdit[key]["description"]);
		};
	};
};
async function actionLabelPullMerge(target, ...sources) {
	if (advancedDetermine.isString(target) !== true) {
		throw new TypeError(`Argument "target" must be type of string (non-nullable)!`);
	};
	switch (target.toLowerCase()) {
		case "def":
		case "default":
			throw new Error(`Cannot modify default label!`);
		case "local-storage":
		case "local":
		case "localstorage":
		case "ls":
		case "storage":
			target = "localstorage";
			break;
		default:
			if (target.search(/^@[\w\d\-._]+$/giu) === 0) {
				throw new Error(`Label is not support organization!`);
			};
			if (target.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) !== 0) {
				throw new SyntaxError(`Argument "target"'s value is not match the require pattern!`);
			};
			break;
	};
	let sourceQueue = [];
	sources.forEach((source) => {
		switch (source.toLowerCase()) {
			case "def":
			case "default":
				sourceQueue.push("default");
				break;
			case "local-storage":
			case "local":
			case "localstorage":
			case "ls":
			case "storage":
				if (target === "localstorage") {
					throw new Error(`Argument "source" and "target" have the same value!`);
				};
				sourceQueue.push("localstorage");
				break;
			default:
				if (source === target) {
					throw new Error(`Argument "source" and "target" have the same value!`);
				};
				if (source.search(/^@[\w\d\-._]+$/giu) === 0) {
					throw new Error(`Label is not support organization!`);
				};
				if (source.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
					sourceQueue.push(source);
					break;
				};
				throw new SyntaxError(`Argument "source"'s value is not match the require pattern!`);
		};
	});
	let targetData = await actionLabelList(target, true);
	if (target === "localstorage") {
		return actionLabelPullMergeLocalStorage(targetData, sourceQueue);
	};
	return actionLabelPullMergeNetworkRepository(target, targetData, sourceQueue);
};
module.exports = actionLabelPullMerge;
