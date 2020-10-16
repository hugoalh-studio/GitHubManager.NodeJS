/*==================
[NodeJS] GitHub Manager - Label - Add
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	localStorage = require("../localstorage.js"),
	passport = require("../passport.js")(),
	Octokit = require("@octokit/rest").Octokit;
const octokit = new Octokit(passport);
function local(name, color, description) {
	let data = localStorage.read("label");
	data = JSON.parse(data);
	data[name] = {
		"color": color,
		"description": description
	};
	localStorage.write("label", JSON.stringify(data));
};
async function network(owner, repositoryName, name, color, description) {
	let data = await octokit.issues.createLabel({
		color: color,
		description: description,
		name: name,
		owner: owner,
		repo: repositoryName
	});
	if (data.status !== 201) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond.`);
	};
	if (data.data.message) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message}!`);
	};
};
function main(repository, name, color, description = "") {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	if (advancedDetermine.isString(name) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "name" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	if (advancedDetermine.isString(color) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "color" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	if (color.search(/^[\da-f][\da-f][\da-f][\da-f][\da-f][\da-f]$/giu) !== 0) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "color" is not match the required pattern!`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "localstorage":
		case "local":
		case "storage":
			local(name, color, description);
			break;
		default:
			if (repository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) !== 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern!`);
				break;
			};
			let [owner, repositoryName] = repository.split("/");
			return network(owner, repositoryName, name, color, description);
			break;
	};
};
module.exports = main;
