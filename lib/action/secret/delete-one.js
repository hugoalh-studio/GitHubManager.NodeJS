const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function secretDeleteLocal(keys) {
	const localStorage = require("../../internal/local-storage.js");
	let data = localStorage.read("secret");
	keys.forEach((key) => {
		delete data[key.toUpperCase()];
	});
	localStorage.write("secret", data);
};
async function secretDeleteNetwork(repositoryOwner, repositoryName, keys) {
	const passport = require("../../bridge/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	for (let index = 0; index < keys.length; index++) {
		let key = keys[index].toUpperCase();
		let data = await octokit.actions.deleteRepoSecret({
			owner: repositoryOwner,
			repo: repositoryName,
			secret_name: key
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error}`);
			process.exit(0);
		});
		if (data.status !== 204) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! Maybe cause error in the beyond.`);
		};
	};
};
async function secretDeleteOrganization(organizationName, keys) {
	const passport = require("../../bridge/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	for (let index = 0; index < keys.length; index++) {
		let key = keys[index].toUpperCase();
		let data = await octokit.actions.deleteOrgSecret({
			org: organizationName,
			secret_name: key
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error}`);
			process.exit(0);
		});
		if (data.status !== 204) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! Maybe cause error in the beyond.`);
		};
	};
};
function secretDelete(repository, ...keys) {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			return secretDeleteLocal(keys);
		default:
			if (repository.search(/^@[\w\d\-._]+$/giu) === 0) {
				let organizationName = repository.split(")")[1];
				return secretDeleteOrganization(organizationName, keys);
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = repository.split("/");
				return secretDeleteNetwork(repositoryOwner, repositoryName, keys);
			};
			throw new SyntaxError(`Argument "repository"'s value is not match the require pattern!`);
			break;
	};
};
module.exports = secretDelete;