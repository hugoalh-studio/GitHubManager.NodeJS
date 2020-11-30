/*==================
[NodeJS] GitHub Manager - Account - Limit
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk"),
	consoleTable = require("cliui");
module.exports = async function accountLimit() {
	const passport = require("../passport/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let data = await octokit.rateLimit.get().catch((error) => {
		console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
		process.exit(0);
	});
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
	};
	let tableLimit = new consoleTable({
		wrap: true
	});
	tableLimit.div(
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
			text: `${chalk.underline.bold("Reset At (ISO UTC)")}`,
			padding: [0, 2, 0, 0],
			width: 26
		},
		{
			text: `${chalk.underline.bold("Reset At (Locale)")}`
		}
	);
	Object.keys(data.data.resources).forEach((key) => {
		let name = key,
			limit = data["data"]["resources"][key]["limit"],
			remain = data["data"]["resources"][key]["remaining"],
			reset = data["data"]["resources"][key]["reset"];
		reset = new Date(reset * 1000);
		tableLimit.div(
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
				text: `${reset.toISOString()}`,
				padding: [0, 2, 0, 0],
				width: 26
			},
			{
				text: `${reset.toString()}`
			}
		);
	});
	console.log(tableLimit.toString());
};
