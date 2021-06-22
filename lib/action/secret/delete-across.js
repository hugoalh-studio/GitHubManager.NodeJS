const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
async function secretDeleteCrossNetwork(key, repositories) {
	const secretDelete = require("./delete.js");
	for (let index = 0; index < repositories.length; index++) {
		let repository = repositories[index];
		await secretDelete(repository, key);
	};
};
function secretDeleteCross(key, ...repositories) {
	if (advancedDetermine.isString(key) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "key" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	key = key.toUpperCase();
	let networkRepositories = [];
	repositories.forEach((repository) => {
		switch (repository.toLowerCase()) {
			case "local-storage":
			case "local":
			case "localstorage":
			case "ls":
			case "storage":
				const localStorage = require("../../internal/local-storage.js");
				let data = localStorage.read("secret");
				delete data[key];
				localStorage.write("secret", data);
				break;
			default:
				if (repository.search(/^@[\w\d\-._]+$/giu) === 0) {
					networkRepositories.push(repository);
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
		return secretDeleteCrossNetwork(key, networkRepositories);
	};
};
module.exports = secretDeleteCross;
