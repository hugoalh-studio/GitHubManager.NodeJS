/*==================
[NodeJS] GitHub Manager - Label - List
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	consoleTable = require("cliui"),
	localStorage = require("../localstorage.js"),
	Octokit = require("../client.js")();
const octokit = new Octokit();
/**
 * @private
 * @function list
 * @param {object} data
 * @returns {void}
 */
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
		if (typeof data.link === "string" && data.link.search(`rel="next"`) !== -1) {
			totalPage += 1;
		};
	};
	list(result);
};
/**
 * @private
 * @function main
 * @param {string} repository
 * @returns {void}
 */
function main(repository) {
	switch (repository.toLowerCase()) {
		case "localstorage":
		case "local":
		case "storage":
			let data = localStorage.read("label");
			list(JSON.parse(data));
			break;
		default:
			if (repository.search(/^\S+\/\S+$/gu) !== 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the pattern!`);
			};
			return network(owner, repository);
			break;
	};
};
module.exports = main;
