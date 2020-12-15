/*==================
[NodeJS] GitHub Manager - Label - Delete
	Language:
		NodeJS/14.15.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function labelDeleteLocal(names) {
	const localStorage = require("../localstorage/internal.js");
	let data = localStorage.read("label");
	names.forEach((name) => {
		delete data[name];
	});
	localStorage.write("label", data);
};
async function labelDeleteNetwork(repositoryOwner, repositoryName, names) {
	const passport = require("../../passport/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	for (let index = 0; index < names.length; index++) {
		let name = names[index];
		let data = await octokit.issues.deleteLabel({
			name: name,
			owner: repositoryOwner,
			repo: repositoryName
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
			process.exit(0);
		});
		if (data.status !== 204) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
	};
};
function labelDelete(repository, ...names) {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "default":
		case "def":
			console.error(`${chalk.bgRed.white.bold("ERROR")} Cannot modify default label! ([NodeJS] GitHub Manager)`);
			break;
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			return labelDeleteLocal(names);
		default:
			if (repository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label is not support organization! ([NodeJS] GitHub Manager)`);
				break;
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = repository.split("/");
				return labelDeleteNetwork(repositoryOwner, repositoryName, names);
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value is not match the require pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
};
module.exports = labelDelete;
