/*==================
[NodeJS] GitHub Manager - Secret - Delete All
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk");
async function network(repositories) {
	const secretDelete = require("./delete.js"),
		secretList = require("./list.js");
	for (let index = 0; index < repositories.length; index++) {
		let repository = repositories[index];
		let data = await secretList(repository, true);
		await secretDelete(repository, ...data);
	};
};
function main(...repositories) {
	let networkRepositories = [];
	repositories.forEach((repository) => {
		switch (repository.toLowerCase()) {
			case "localstorage":
			case "local":
			case "ls":
			case "storage":
				const localStorage = require("../localstorage/internal.js");
				localStorage.write("secret", {});
				break;
			default:
				if (repository.search(/o(rg)?(anization)?:[\w\d\-._]+/giu) === 0) {
					networkRepositories.push(repository);
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
