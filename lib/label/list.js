/*==================
[NodeJS] GitHub Manager - Label - List
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	consoleTable = require("cliui"),
	passport = require("../passport.js")(),
	Octokit = require("@octokit/rest").Octokit;
const octokit = new Octokit(passport);
function list(data) {
	let commandListBuild = new consoleTable({
		wrap: true
	});
	commandListBuild.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold("Name (White)")}`,
			padding: [0, 2, 0, 0],
			width: 26
		},
		{
			text: `${chalk.underline.bold("Name (Black)")}`,
			padding: [0, 2, 0, 0],
			width: 26
		},
		{
			text: `${chalk.underline.bold("Colour (HEX)")}`,
			padding: [0, 2, 0, 0],
			width: 14
		},
		{
			text: `${chalk.underline.bold("Description")}`
		}
	);
	Object.keys(data).sort().forEach((key) => {
		let name = key,
			color = data[key]["color"],
			description = data[key]["description"] || "";
		commandListBuild.div(
			{
				text: `-`,
				width: 2
			},
			{
				text: `${chalk.bgHex(`#${color.toUpperCase()}`).white(name)}`,
				padding: [0, 2, 0, 0],
				width: 26
			},
			{
				text: `${chalk.bgHex(`#${color.toUpperCase()}`).black(name)}`,
				padding: [0, 2, 0, 0],
				width: 26
			},
			{
				text: color,
				padding: [0, 2, 0, 0],
				width: 14
			},
			{
				text: description
			}
		);
	});
	console.log(commandListBuild.toString());
};
async function network(owner, repository) {
	let result = {},
		totalPage = 1;
	for (let index = 0; index < totalPage; index++) {
		let data = await octokit.issues.listLabelsForRepo({
			owner: owner,
			repo: repository,
			page: index + 1,
			per_page: 100
		});
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
					console.log(`${chalk.bgBlue.white.bold("INFO")} Repository ${owner}/${repository} has almost ${totalPage * 100} labels, this action may take longer than usual!`);
				};
			};
		};
	};
	list(result);
};
function main(input) {
	switch (input.toLowerCase()) {
		case "localstorage":
		case "local":
		case "storage":
			let data = localStorage.read("label");
			list(JSON.parse(data));
			break;
		default:
			if (input.search(/^[\w\d\-\._]+\/[\w\d\-\._]+$/gu) !== 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the required pattern!`);
				break;
			};
			let [owner, repository] = input.split("/");
			return network(owner, repository);
			break;
	};
};
module.exports = main;
