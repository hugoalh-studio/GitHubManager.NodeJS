/*==================
[NodeJS] GitHub Manager - Secret - Add
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function local(key, value) {
	const localStorage = require("../localstorage.js");
	let data = localStorage.read("secret");
	data[key] = value;
	localStorage.write("secret", data);
};
async function network(repositoryOwner, repositoryName, key, value) {
	const soulEncrypt = require("./encrypt.js"),
		passport = require("../passport.js")(),
		secretPublicKey = require("./publickey.js"),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let publicKey = await secretPublicKey(repositoryOwner, repositoryName);
	value = soulEncrypt(publicKey.key, value);
	let data = await octokit.actions.createOrUpdateRepoSecret({
		encrypted_value: value,
		key_id: publicKey.key_id,
		owner: repositoryOwner,
		repo: repositoryName,
		secret_name: key
	});
	if (data.status !== 201 || data.status !== 204) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
	};
	if (typeof data.data.message !== "undefined") {
		console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message}! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
};
async function organization(organizationName, key, value) {
	const soulEncrypt = require("./encrypt.js"),
		passport = require("../passport.js")(),
		secretPublicKey = require("./publickey.js"),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let publicKey = await secretPublicKey(organizationName);
	value = soulEncrypt(publicKey.key, value);
	let data = await octokit.actions.createOrUpdateOrgSecret({
		encrypted_value: value,
		key_id: publicKey.key_id,
		org: organizationName,
		secret_name: key
	});
	if (data.status !== 201 || data.status !== 204) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
	};
	if (typeof data.data.message !== "undefined") {
		console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message}! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
};
function main(repository, key, value) {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	if (advancedDetermine.isString(key) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "key" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	if (advancedDetermine.isString(value) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "value" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			return local(key, value);
		default:
			if (repository.search(/o(rg)?(anization)?:[\w\d\-._]+/giu) === 0) {
				let organizationName = repository.split(":")[1];
				return organization(organizationName, key, value);
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = repository.split("/");
				return network(repositoryOwner, repositoryName, key, value);
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
};
module.exports = main;
