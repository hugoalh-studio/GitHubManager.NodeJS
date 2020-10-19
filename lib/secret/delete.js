/*==================
[NodeJS] GitHub Manager - Secret - Delete
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function local(names) {
	const localStorage = require("../localstorage.js");
	let data = JSON.parse(localStorage.read("label"));
	names.forEach((name) => {
		delete data[name];
	});
	localStorage.write("label", JSON.stringify(data));
};
async function network(repositoryOwner, repositoryName, names) {
	const passport = require("../passport.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	for (let index = 0; index < names.length; index++) {
		let name = names[index];
		let data = await octokit.issues.deleteLabel({
			name: name,
			owner: repositoryOwner,
			repo: repositoryName
		});
		if (data.status !== 201) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
		if (data.data.message) {
			console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message}! ([NodeJS] GitHub Manager (L-D-${repositoryOwner.toUpperCase()}-${repositoryName.toUpperCase()}-${name.toUpperCase()}}))`);
			process.exit(0);
		};
	};
};
function main(repository, ...names) {
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
			local(names);
			break;
		default:
			if (repository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) === 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
				break;
			};
			if (repository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = repository.split("/");
				return network(repositoryOwner, repositoryName, names);
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
};
module.exports = main;
