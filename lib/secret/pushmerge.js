/*==================
[NodeJS] GitHub Manager - Secret - Push Merge
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk");
async function network(sourceData, repositories) {
	const secretAdd = require("./add.js");
	let sourceDataKey = Object.keys(sourceData);
	for (let indexRepository = 0; indexRepository < repositories.length; indexRepository++) {
		let repository = repositories[indexRepository];
		for (let indexSource = 0; indexSource < sourceDataKey.length; indexSource++) {
			let sourceKey = sourceDataKey[indexSource];
			await secretAdd(repository, sourceKey, sourceData[sourceKey]);
		};
	};
};
function main(...repositories) {
	let networkRepositories = [];
	for (let index = 0; index < repositories.length; index++) {
		let repository = repositories[index];
		switch (repository.toLowerCase()) {
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify local storage secret! ([NodeJS] GitHub Manager)`);
				continue;
			default:
				if (repository.search(/o(rg)?(anization)?:[\w\d\-._]+/giu) === 0) {
					networkRepositories.push(repository);
					continue;
				};
				if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
					networkRepositories.push(repository);
					continue;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "targetRepository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				continue;
		};
	};
	const localStorage = require("../localstorage.js");
	let sourceData = localStorage.read("secret");
	if (networkRepositories.length > 0) {
		return network(sourceData, networkRepositories);
	};
};
module.exports = main;
