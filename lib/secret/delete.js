/*==================
[NodeJS] GitHub Manager - Secret - Delete
	Language:
		NodeJS/14.15.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function secretDeleteLocal(keys) {
	const localStorage = require("../localstorage/internal.js");
	let data = localStorage.read("secret");
	keys.forEach((key) => {
		delete data[key.toUpperCase()];
	});
	localStorage.write("secret", data);
};
async function secretDeleteNetwork(repositoryOwner, repositoryName, keys) {
	const passport = require("../passport/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	for (let index = 0; index < keys.length; index++) {
		let key = keys[index].toUpperCase();
		let data = await octokit.actions.deleteRepoSecret({
			owner: repositoryOwner,
			repo: repositoryName,
			secret_name: key
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
			process.exit(0);
		});
		if (data.status !== 204) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
	};
};
async function secretDeleteOrganization(organizationName, keys) {
	const passport = require("../passport/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	for (let index = 0; index < keys.length; index++) {
		let key = keys[index].toUpperCase();
		let data = await octokit.actions.deleteOrgSecret({
			org: organizationName,
			secret_name: key
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
			process.exit(0);
		});
		if (data.status !== 204) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
	};
};
function secretDelete(repository, ...keys) {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			return secretDeleteLocal(keys);
		default:
			if (repository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
				let organizationName = repository.split(")")[1];
				return secretDeleteOrganization(organizationName, keys);
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = repository.split("/");
				return secretDeleteNetwork(repositoryOwner, repositoryName, keys);
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value is not match the require pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
};
module.exports = secretDelete;
