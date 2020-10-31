/*==================
[NodeJS] GitHub Manager - Label - Delete Cross
	Language:
		NodeJS/10.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
async function network(name, repositories) {
	const labelDelete = require("./delete.js");
	for (let index = 0; index < repositories.length; index++) {
		let repository = repositories[index];
		await labelDelete(repository, name);
	};
};
function main(name, ...repositories) {
	if (advancedDetermine.isString(name) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "name" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
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
				const localStorage = require("../localstorage/internal.js");
				let data = localStorage.read("label");
				delete data[name];
				localStorage.write("label", data);
				break;
			default:
				if (repository.search(/o(rg)?(anization)?:[\w\d\-._]+/giu) === 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
					break;
				};
				if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
					networkRepositories.push(repository);
					break;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
				break;
		};
	});
	if (networkRepositories.length > 0) {
		return network(name, networkRepositories);
	};
};
module.exports = main;
