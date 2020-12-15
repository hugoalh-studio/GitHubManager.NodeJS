/*==================
[NodeJS] GitHub Manager - Label - Delete All
	Language:
		NodeJS/14.15.0
==================*/
const chalk = require("chalk");
async function labelDeleteAllNetwork(repositories) {
	const labelDelete = require("./delete.js"),
		labelList = require("./list.js");
	for (let index = 0; index < repositories.length; index++) {
		let repository = repositories[index];
		let data = await labelList(repository, true);
		let names = Object.keys(data);
		await labelDelete(repository, ...names);
	};
};
function labelDeleteAll(...repositories) {
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
				localStorage.write("label", {});
				break;
			default:
				if (repository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
					console.error(`${chalk.bgRed.white.bold("ERROR")} Label is not support organization! ([NodeJS] GitHub Manager)`);
					break;
				};
				if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
					networkRepositories.push(repository);
					break;
				};
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value is not match the require pattern! ([NodeJS] GitHub Manager)`);
				break;
		};
	});
	if (networkRepositories.length > 0) {
		return labelDeleteAllNetwork(networkRepositories);
	};
};
module.exports = labelDeleteAll;
