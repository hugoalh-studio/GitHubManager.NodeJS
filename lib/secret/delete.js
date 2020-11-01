/*==================
[NodeJS] GitHub Manager - Secret - Delete
	Language:
		NodeJS/10.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function local(keys) {
	const localStorage = require("../localstorage/internal.js");
	let data = localStorage.read("secret");
	keys.forEach((key) => {
		delete data[key.toUpperCase()];
	});
	localStorage.write("secret", data);
};
async function network(repositoryOwner, repositoryName, keys) {
	const accountWho = require("../account/whoami.js"),
		passport = require("../passport.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let accountList = await accountWho(true);
	if (accountList.includes(repositoryOwner) === false) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Only administrator can modify ${repositoryOwner}/${repositoryName}! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	for (let index = 0; index < keys.length; index++) {
		let key = keys[index].toUpperCase();
		let data = await octokit.actions.deleteRepoSecret({
			owner: repositoryOwner,
			repo: repositoryName,
			secret_name: key
		});
		if (data.status !== 204) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
	};
};
async function organization(organizationName, keys) {
	const accountWho = require("../account/whoami.js"),
		passport = require("../passport.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let accountList = await accountWho(true);
	if (accountList.includes(organizationName) === false) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Only administrator can modify ${organizationName}! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	for (let index = 0; index < keys.length; index++) {
		let key = keys[index].toUpperCase();
		let data = await octokit.actions.deleteOrgSecret({
			org: organizationName,
			secret_name: key
		});
		if (data.status !== 204) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
	};
};
function main(repository, ...keys) {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			return local(keys);
		default:
			if (repository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
				let organizationName = repository.split(")")[1];
				return organization(organizationName, keys);
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = repository.split("/");
				return network(repositoryOwner, repositoryName, keys);
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
};
module.exports = main;
