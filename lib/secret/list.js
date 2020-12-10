/*==================
[NodeJS] GitHub Manager - Secret - List
	Language:
		NodeJS/14.15.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	consoleTable = require("cliui");
function secretListDisplayFull(data) {
	if (advancedDetermine.isObjectPair(data) !== true) {
		console.log(`${chalk.bgBlue.white.bold("INFO")} No data! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let tableSecretFull = new consoleTable({
		wrap: true
	});
	tableSecretFull.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold("Key")}`,
			padding: [0, 2, 0, 0],
			width: 42
		},
		{
			text: `${chalk.underline.bold("Value")}`
		}
	);
	Object.keys(data).sort().forEach((key) => {
		tableSecretFull.div(
			{
				text: `-`,
				width: 2
			},
			{
				text: key,
				padding: [0, 2, 0, 0],
				width: 42
			},
			{
				text: data[key]
			}
		);
	});
	console.log(tableSecretFull.toString());
};
function secretListDisplayPart(data) {
	if (advancedDetermine.isArray(data) !== true) {
		console.log(`${chalk.bgBlue.white.bold("INFO")} No data! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let tableSecretPart = new consoleTable({
		wrap: true
	});
	tableSecretPart.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold("Key")}`
		}
	);
	data.forEach((key) => {
		tableSecretPart.div(
			{
				text: `-`,
				width: 2
			},
			{
				text: key
			}
		);
	});
	console.log(tableSecretPart.toString());
};
async function secretListNetwork(repositoryOwner, repositoryName, internalUse) {
	const passport = require("../passport/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let result = [],
		totalPage = 1;
	for (let index = 0; index < totalPage; index++) {
		let data = await octokit.actions.listRepoSecrets({
			owner: repositoryOwner,
			page: index + 1,
			per_page: 100,
			repo: repositoryName
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
			process.exit(0);
		});
		if (data.status !== 200) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
		data.data.secrets.forEach((element) => {
			result.push(element.name);
		});
		if (index === 0) {
			if (advancedDetermine.isString(data.headers.link) === true) {
				if (data.headers.link.search(/\?page=(\d+)&per_page=100>; rel="last"/giu) !== -1) {
					let totalPageData = data.headers.link.match(/\?page=(\d+)&per_page=100>; rel="last"/giu)[0].split("&")[0].split("=")[1];
					totalPage = Number(totalPageData);
					console.log(`${chalk.bgBlue.white.bold("INFO")} Repository "${repositoryOwner}/${repositoryName}" has at most ${totalPage * 100} secrets, this action may take longer than usual! ([NodeJS] GitHub Manager)`);
				};
			};
		};
	};
	if (internalUse === true) {
		return result;
	};
	return secretListDisplayPart(result);
};
async function secretListOrganization(organizationName, internalUse) {
	const passport = require("../passport/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let result = [],
		totalPage = 1;
	for (let index = 0; index < totalPage; index++) {
		let data = await octokit.actions.listOrgSecrets({
			org: organizationName,
			page: index + 1,
			per_page: 100
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
			process.exit(0);
		});
		if (data.status !== 200) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
		data.data.secrets.forEach((element) => {
			result.push(element.name);
		});
		if (index === 0) {
			if (advancedDetermine.isString(data.headers.link) === true) {
				if (data.headers.link.search(/\?page=(\d+)&per_page=100>; rel="last"/giu) !== -1) {
					let totalPageData = data.headers.link.match(/\?page=(\d+)&per_page=100>; rel="last"/giu)[0].split("&")[0].split("=")[1];
					totalPage = Number(totalPageData);
					console.log(`${chalk.bgBlue.white.bold("INFO")} Organization "${organizationName}" has at most ${totalPage * 100} secrets, this action may take longer than usual! ([NodeJS] GitHub Manager)`);
				};
			};
		};
	};
	if (internalUse === true) {
		return result;
	};
	return secretListDisplayPart(result);
};
function secretList(repository, internalUse = false) {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			const localStorage = require("../localstorage/internal.js");
			let data = localStorage.read("secret");
			return ((internalUse === true) ? data : secretListDisplayFull(data));
		default:
			if (repository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
				let organizationName = repository.split(")")[1];
				return secretListOrganization(organizationName, internalUse);
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = repository.split("/");
				return secretListNetwork(repositoryOwner, repositoryName, internalUse);
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value is not match the require pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
};
module.exports = secretList;
