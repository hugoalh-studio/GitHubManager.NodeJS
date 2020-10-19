/*==================
[NodeJS] GitHub Manager - Secret - Edit
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
async function network(repositoryOwner, repositoryName, name, color, description) {
	const passport = require("../passport.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let data = await octokit.issues.updateLabel({
		color: color,
		description: description,
		name: name,
		owner: repositoryOwner,
		repo: repositoryName
	});
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
	};
	if (data.data.message) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message}! ([NodeJS] GitHub Manager (L-A-${repositoryOwner.toUpperCase()}-${repositoryName.toUpperCase()}-${name.toUpperCase()}-${color.toUpperCase()}))`);
		process.exit(0);
	};
};
function main(repository, name, color, description = "") {
	/*
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	if (advancedDetermine.isString(name) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "name" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	if (advancedDetermine.isString(color) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "color" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	if (color.search(/^[\da-f][\da-f][\da-f][\da-f][\da-f][\da-f]$/giu) !== 0) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "color" is not match the required pattern! ([NodeJS] GitHub Manager)`);
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
			local(name, color, description);
			break;
		default:
			if (repository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) === 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
				break;
			};
			if (repository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/giu) === 0) {
	*/
				let [repositoryOwner, repositoryName] = repository.split("/");
				return network(repositoryOwner, repositoryName, name, color, description);
	/*
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
	*/
};
module.exports = main;
