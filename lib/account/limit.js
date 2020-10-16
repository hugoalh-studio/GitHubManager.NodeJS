/*==================
[NodeJS] GitHub Manager - Account - Limit
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk"),
	consoleTable = require("cliui"),
	passport = require("../passport.js")(),
	Octokit = require("@octokit/rest").Octokit;
const octokit = new Octokit(passport);
module.exports = async function main() {
	let data = await octokit.rateLimit.get();
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond.`);
	};
	if (data.data.message) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message}!`);
	} else {
		let commandListBuild = new consoleTable({
			wrap: true
		});
		commandListBuild.div(
			{
				text: ``,
				width: 2
			},
			{
				text: `${chalk.underline.bold("Resource")}`,
				padding: [0, 2, 0, 0],
				width: 26
			},
			{
				text: `${chalk.underline.bold("Limit")}`,
				padding: [0, 2, 0, 0],
				width: 8
			},
			{
				text: `${chalk.underline.bold("Remain")}`,
				padding: [0, 2, 0, 0],
				width: 8
			},
			{
				text: `${chalk.underline.bold("Reset")}`
			}
		);
		Object.keys(data.data.resources).forEach((key) => {
			let name = key,
				limit = data["data"]["resources"][key]["limit"],
				remain = data["data"]["resources"][key]["remaining"],
				reset = data["data"]["resources"][key]["reset"];
			reset = new Date(reset).toISOString();
			commandListBuild.div(
				{
					text: `-`,
					width: 2
				},
				{
					text: `${name}`,
					padding: [0, 2, 0, 0],
					width: 26
				},
				{
					text: `${limit}`,
					padding: [0, 2, 0, 0],
					width: 8
				},
				{
					text: `${remain}`,
					padding: [0, 2, 0, 0],
					width: 8
				},
				{
					text: `${reset}`
				}
			);
		});
		console.log(commandListBuild.toString());
	};
};
