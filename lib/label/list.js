/*==================
[NodeJS] GitHub Manager - Label - List
	Language:
		NodeJS/10.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	consoleTable = require("cliui");
function display(data) {
	if (advancedDetermine.isObjectPair(data) !== true) {
		console.log(`${chalk.bgBlue.white.bold("INFO")} No data! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let tableLabel = new consoleTable({
		wrap: true
	});
	tableLabel.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold("Name")}`,
			padding: [0, 2, 0, 0],
			width: 42
		},
		{
			text: `${chalk.underline.bold("Color")}`,
			padding: [0, 2, 0, 0],
			width: 10
		},
		{
			text: `${chalk.underline.bold("Description")}`
		}
	);
	Object.keys(data).sort().forEach((key) => {
		let name = key,
			color = data[key]["color"],
			description = data[key]["description"] || "";
		tableLabel.div(
			{
				text: `-`,
				width: 2
			},
			{
				text: name,
				padding: [0, 2, 0, 0],
				width: 42
			},
			{
				text: `${chalk.bgHex(`#${color.toUpperCase()}`).bold("　")}${color.toLowerCase()}`,
				padding: [0, 2, 0, 0],
				width: 10
			},
			{
				text: description
			}
		);
	});
	console.log(tableLabel.toString());
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
			page: index + 1,
			per_page: 100,
			repo: repositoryName
		});
		if (data.status !== 200) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
		data.data.forEach((element) => {
			result[element["name"]] = {
				"color": element["color"],
				"description": element["description"] || ""
			};
		});
		if (index === 0) {
			if (advancedDetermine.isString(data.headers.link) === true) {
				if (data.headers.link.search(/\?page=(\d+)&per_page=100>; rel="last"/giu) !== -1) {
					let totalPageData = data.headers.link.match(/\?page=(\d+)&per_page=100>; rel="last"/giu)[0].split("&")[0].split("=")[1];
					totalPage = Number(totalPageData);
					console.log(`${chalk.bgBlue.white.bold("INFO")} Repository "${repositoryOwner}/${repositoryName}" has at most ${totalPage * 100} labels, this action may take longer than usual! ([NodeJS] GitHub Manager)`);
				};
			};
		};
	};
	if (internalUse === true) {
		return result;
	};
	return display(result);
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
			return ((internalUse === true) ? labelDefault : display(labelDefault));
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			const localStorage = require("../localstorage/internal.js");
			let data = localStorage.read("label");
			return ((internalUse === true) ? data : display(data));
		default:
			if (repository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label does not support organization! ([NodeJS] GitHub Manager)`);
				break;
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
				let [owner, repositoryName] = repository.split("/");
				return network(owner, repositoryName, internalUse);
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
};
module.exports = main;
