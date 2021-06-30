const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
function secretAddLocal(key, value) {
	const localStorage = require("../../internal/local-storage.js");
	let data = localStorage.read("secret");
	data[key] = value;
	localStorage.write("secret", data);
};
async function secretAddNetwork(repositoryOwner, repositoryName, key, value) {
	const githubSodium = require("@hugoalh/github-sodium"),
		passport = require("../../bridge/rest.js")(),
		secretPublicKey = require("./publickey.js.js"),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let publicKey = await secretPublicKey(repositoryOwner, repositoryName);
	value = githubSodium(publicKey.key, value);
	let data = await octokit.actions.createOrUpdateRepoSecret({
		encrypted_value: value,
		key_id: publicKey.key_id,
		owner: repositoryOwner,
		repo: repositoryName,
		secret_name: key
	}).catch((error) => {
		console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error}`);
		process.exit(0);
	});
	if (data.status !== 201 && data.status !== 204) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! Maybe cause error in the beyond.`);
	};
};
async function secretAddOrganization(organizationName, key, value) {
	const githubSodium = require("@hugoalh/github-sodium"),
		passport = require("../../bridge/rest.js")(),
		secretPublicKey = require("./publickey.js.js"),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let publicKey = await secretPublicKey(organizationName);
	value = githubSodium(publicKey.key, value);
	let data = await octokit.actions.createOrUpdateOrgSecret({
		encrypted_value: value,
		key_id: publicKey.key_id,
		org: organizationName,
		secret_name: key,
		visibility: "all"
	}).catch((error) => {
		console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error}`);
		process.exit(0);
	});
	if (data.status !== 201 && data.status !== 204) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! Maybe cause error in the beyond.`);
	};
};
function secretAdd(repository, key, value) {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	if (advancedDetermine.isString(key) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "key" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	if (advancedDetermine.isString(value) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "value" must be type of string (non-nullable)!`);
		process.exit(0);
	};
	key = key.toUpperCase();
	switch (repository.toLowerCase()) {
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			return secretAddLocal(key, value);
		default:
			if (repository.search(/^@[\w\d\-._]+$/giu) === 0) {
				let organizationName = repository.split(")")[1];
				return secretAddOrganization(organizationName, key, value);
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = repository.split("/");
				return secretAddNetwork(repositoryOwner, repositoryName, key, value);
			};
			throw new SyntaxError(`Argument "repository"'s value is not match the require pattern!`);
			break;
	};
};
module.exports = secretAdd;
