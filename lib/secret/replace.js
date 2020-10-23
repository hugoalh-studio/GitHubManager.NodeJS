/*==================
[NodeJS] GitHub Manager - Secret - Replace
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	secretList = require("./list.js");
async function network(sourceData, targetRepositories) {
	const secretAdd = require("./add.js"),
		secretDelete = require("./delete.js");
	let sourceDataKey = Object.keys(sourceData);
	for (let indexRepository = 0; indexRepository < targetRepositories.length; indexRepository++) {
		let targetRepository = targetRepositories[indexRepository];
		let dataDelete = [],
			targetData = await secretList(targetRepository, true);
		let targetDataKey = Object.keys(targetData);
		targetDataKey.forEach((targetKey) => {
			if (sourceDataKey.includes(targetKey) !== true) {
				dataDelete.push(targetKey);
			};
		});
		for (let indexSource = 0; indexSource < sourceDataKey.length; indexSource++) {
			let sourceKey = sourceDataKey[indexSource];
			await secretAdd(targetRepository, sourceKey, sourceData[sourceKey]);
		};
		if (advancedDetermine.isArray(dataDelete) === true) {
			await secretDelete(targetRepository, ...dataDelete);
		};
	};
};
function main(...targetRepositories) {
	let targetNetworkRepositories = [];
	targetRepositories.forEach((targetRepository) => {
		switch (targetRepository.toLowerCase()) {
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify local storage secret! ([NodeJS] GitHub Manager)`);
				break;
			default:
				if (targetRepository.search(/o(rg)?(anization)?:[\w\d\-._]+/giu) === 0) {
					targetNetworkRepositories.push(targetRepository);
					break;
				};
				if (targetRepository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
					targetNetworkRepositories.push(targetRepository);
					break;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				break;
		};
	});
	const localStorage = require("../localstorage.js");
	let sourceData = localStorage.read("secret");
	if (targetNetworkRepositories.length > 0) {
		return network(sourceData, targetNetworkRepositories);
	};
};
module.exports = main;
