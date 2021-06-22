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
			case "def":
			case "default":
				console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label!`);
				break;
			case "local-storage":
			case "local":
			case "localstorage":
			case "ls":
			case "storage":
				const localStorage = require("../../internal/local-storage.js");
				localStorage.write("label", {});
				break;
			default:
				if (repository.search(/^@[\w\d\-._]+$/giu) === 0) {
					throw new Error(`Label is not support organization!`);
					break;
				};
				if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
					networkRepositories.push(repository);
					break;
				};
				throw new SyntaxError(`Argument "repository"'s value is not match the require pattern!`);
				break;
		};
	});
	if (networkRepositories.length > 0) {
		return labelDeleteAllNetwork(networkRepositories);
	};
};
module.exports = labelDeleteAll;
