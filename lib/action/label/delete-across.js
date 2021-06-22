const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
async function labelDeleteCrossNetwork(name, repositories) {
	const labelDelete = require("./delete.js");
	for (let index = 0; index < repositories.length; index++) {
		let repository = repositories[index];
		await labelDelete(repository, name);
	};
};
function labelDeleteCross(name, ...repositories) {
	if (advancedDetermine.isString(name) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "name" must be type of string (non-nullable)!`);
		process.exit(0);
	};
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
				let data = localStorage.read("label");
				delete data[name];
				localStorage.write("label", data);
				break;
			default:
				if (repository.search(/^@[\w\d\-._]+$/giu) === 0) {
					throw new Error(`Label is not support organization!`);
					break;
				};
				if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
					networkRepositories.push(repository);
					break;
				};
				throw new SyntaxError(`Argument "repository"'s value is not match the require pattern!`);
				break;
		};
	});
	if (networkRepositories.length > 0) {
		return labelDeleteCrossNetwork(name, networkRepositories);
	};
};
module.exports = labelDeleteCross;
