/*==================
[NodeJS] GitHub Manager - Label - Delete All
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk");
async function network(repositories) {
	const labelDelete = require("./delete.js"),
		labelList = require("./list.js");
	for (let index = 0; index < repositories.length; index++) {
		let repository = repositories[index];
		let data = await labelList(repository, true);
		let names = Object.keys(data);
		await labelDelete(repository, ...names);
	};
};
function main(...repositories) {
	let networkRepositories = [];
	repositories.forEach((repository) => {
		switch (repository.toLowerCase()) {
			case "default":
			case "def":
				console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label! ([NodeJS] GitHub Manager)`);
				break;
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				const localStorage = require("../localstorage.js");
				localStorage.write("label", {});
				break;
			default:
				if (repository.search(/o(rg)?(anization)?:[\w\d\-._]+/giu) === 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
					break;
				};
				if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
					networkRepositories.push(repository);
					break;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				break;
		};
	});
	if (networkRepositories.length > 0) {
		return network(networkRepositories);
	};
};
module.exports = main;
