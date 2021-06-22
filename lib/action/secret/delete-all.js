const chalk = require("chalk");
async function secretDeleteAllNetwork(repositories) {
	const secretDelete = require("./delete.js"),
		secretList = require("./list.js");
	for (let index = 0; index < repositories.length; index++) {
		let repository = repositories[index];
		let data = await secretList(repository, true);
		await secretDelete(repository, ...data);
	};
};
function secretDeleteAll(...repositories) {
	let networkRepositories = [];
	repositories.forEach((repository) => {
		switch (repository.toLowerCase()) {
			case "local-storage":
			case "local":
			case "localstorage":
			case "ls":
			case "storage":
				const localStorage = require("../../internal/local-storage.js");
				localStorage.write("secret", {});
				break;
			default:
				if (repository.search(/^@[\w\d\-._]+$/giu) === 0) {
					networkRepositories.push(repository);
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
		return secretDeleteAllNetwork(networkRepositories);
	};
};
module.exports = secretDeleteAll;
