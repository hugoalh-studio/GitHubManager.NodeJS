const chalk = require("chalk"),
	consoleTable = require("cliui"),
	internalConsole = require("../../internal/console.js"),
	languageService = require("../../language/main.js");
/**
 * @private
 * @function actionAccountRateLimit
 * @async
 * @returns {void}
 */
async function actionAccountRateLimit() {
	const githubRest = require("../../bridge/rest.js")();
	let data = await githubRest.rateLimit.get().catch((error) => {
		throw new Error(error);
	});
	if (data.status !== 200) {
		internalConsole.warning(`Receive status code ${data.status}! Maybe cause error in the beyond.`);
	};
	let tableRateLimit = new consoleTable({
		wrap: true
	});
	tableRateLimit.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold(languageService.accountRateLimitTableTitleResource)}`,
			padding: [0, 2, 0, 0],
			width: 26
		},
		{
			text: `${chalk.underline.bold(languageService.accountRateLimitTableTitleLimit)}`,
			padding: [0, 2, 0, 0],
			width: 8
		},
		{
			text: `${chalk.underline.bold(languageService.accountRateLimitTableTitleRemain)}`,
			padding: [0, 2, 0, 0],
			width: 8
		},
		{
			text: `${chalk.underline.bold(languageService.accountRateLimitTableTitleResetAtISOUTC)}`,
			padding: [0, 2, 0, 0],
			width: 26
		},
		{
			text: `${chalk.underline.bold(languageService.accountRateLimitTableTitleResetAtLocale)}`
		}
	);
	Object.keys(data.data.resources).forEach((key) => {
		let name = key,
			limit = data["data"]["resources"][key]["limit"],
			remain = data["data"]["resources"][key]["remaining"],
			reset = data["data"]["resources"][key]["reset"];
		reset = new Date(reset * 1000);
		tableRateLimit.div(
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
	console.log(tableRateLimit.toString());
};
module.exports = actionAccountRateLimit;
