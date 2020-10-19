/*==================
[NodeJS] GitHub Manager - Secret - List
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	consoleTable = require("cliui");
function display(data) {
	let commandListBuild = new consoleTable({
		wrap: true
	});
	commandListBuild.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold("Name")}`,
			padding: [0, 2, 0, 0],
			width: 26
		},
		{
			text: `${chalk.underline.bold("Value")}`
		}
	);
	Object.keys(data).sort().forEach((key) => {
		let name = key,
			value = data[key];
		commandListBuild.div(
			{
				text: `-`,
				width: 2
			},
			{
				text: name,
				padding: [0, 2, 0, 0],
				width: 26
			},
			{
				text: value
			}
		);
	});
	console.log(commandListBuild.toString());
};
async function network(repositoryOwner, repositoryName, internalUse) {
	const passport = require("../passport.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let result = {},
		totalPage = 1;
	for (let index = 0; index < totalPage; index++) {
		let data = await octokit.issues.listLabelsForRepo({
			owner: repositoryOwner,
			repo: repositoryName,
			page: index + 1,
			per_page: 100
		});
		if (data.status !== 200) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
		if (data.data.message) {
			console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message} (Code: L-L-${repositoryOwner.toUpperCase()}-${repositoryName.toUpperCase()}-${index + 1})! ([NodeJS] GitHub Manager)`);
			process.exit(0);
		};
		data.data.forEach((element) => {
			result[element["name"]] = {
				"color": element["color"],
				"description": element["description"]
			};
		});
		if (index === 0) {
			if (advancedDetermine.isString(data.headers.link) === true) {
				let totalPageData = data.headers.link.match(/page=(\d)+>; rel="last"/gu);
				if (totalPageData.length === 2) {
					totalPage = Number(totalPageData[1]);
					console.log(`${chalk.bgBlue.white.bold("INFO")} Repository ${repositoryOwner}/${repositoryName} has almost ${totalPage * 100} labels, this action may take longer than usual! ([NodeJS] GitHub Manager)`);
				};
			};
		};
	};
	if (internalUse === true) {
		return result;
	};
	display(result);
};
function main(repository, internalUse = false) {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "default":
		case "def":
			const labelDefault = require("../label_default.js");
			if (internalUse === true) {
				return labelDefault;
			};
			display(labelDefault);
			break;
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			const localStorage = require("../localstorage.js");
			let data = JSON.parse(localStorage.read("label"));
			if (internalUse === true) {
				return data;
			};
			display(data);
			break;
		default:
			if (repository.search(/o(rg)?(anization)?:[\w\d\-\._]+/giu) !== 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
				break;
			};
			if (repository.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) === 0) {
				let [owner, repositoryName] = repository.split("/");
				return network(owner, repositoryName, internalUse);
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
};
module.exports = main;