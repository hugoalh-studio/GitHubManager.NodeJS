/*==================
[NodeJS] GitHub Manager - Secret - Push Merge
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk");
async function network(sourceData, targetRepositories) {
	const secretAdd = require("./add.js");
	let sourceDataKey = Object.keys(sourceData);
	for (let indexRepository = 0; indexRepository < targetRepositories.length; indexRepository++) {
		let targetRepository = targetRepositories[indexRepository];
		for (let indexSource = 0; indexSource < sourceDataKey.length; indexSource++) {
			let sourceKey = sourceDataKey[indexSource];
			await secretAdd(targetRepository, sourceKey, sourceData[sourceKey]);
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
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				break;
		};
	});
	const localStorage = require("../localstorage/internal.js");
	let sourceData = localStorage.read("secret");
	if (targetNetworkRepositories.length > 0) {
		return network(sourceData, targetNetworkRepositories);
	};
};
module.exports = main;
