const chalk = require("chalk"),
	consoleTable = require("cliui"),
	internalConsole = require("../../internal/console.js"),
	languageService = require("../../language/main.js");
/**
 * @private
 * @function actionAccountRateLimit
 * @async
 * @param {object} commandLine
 * @returns {void}
 */
async function actionAccountRateLimit(commandLine) {
	const githubREST = require("../../bridge/rest.js").read();
	let data = await githubREST.rateLimit.get().catch((error) => {
		throw new Error(error);
	});
	if (data.status !== 200) {
		internalConsole.warning(languageService.warningUnexpectedNetworkStatusCode, { statusCode: data.status });
	};
	let tableRateLimit = new consoleTable({ wrap: true });
	tableRateLimit.div(
		{
			text: "",
			width: 2
		},
		{
			text: chalk.underline.bold(languageService.accountRateLimitTableHeaderResource),
			padding: [0, 2, 0, 0],
			width: 26
		},
		{
			text: chalk.underline.bold(languageService.accountRateLimitTableHeaderLimit),
			padding: [0, 2, 0, 0],
			width: 8
		},
		{
			text: chalk.underline.bold(languageService.accountRateLimitTableHeaderRemain),
			padding: [0, 2, 0, 0],
			width: 8
		},
		{
			text: chalk.underline.bold(languageService.accountRateLimitTableHeaderResetAtISOUTC),
			padding: [0, 2, 0, 0],
			width: 26
		},
		{
			text: chalk.underline.bold(languageService.accountRateLimitTableHeaderResetAtLocale)
		}
	);
	Object.keys(data.data.resources).forEach((key) => {
		let reset = new Date(data.data.resources[key].reset * 1000);
		tableRateLimit.div(
			{
				text: "-",
				width: 2
			},
			{
				text: key,
				padding: [0, 2, 0, 0],
				width: 26
			},
			{
				text: `${data.data.resources[key].limit}`,
				padding: [0, 2, 0, 0],
				width: 8
			},
			{
				text: `${data.data.resources[key].remaining}`,
				padding: [0, 2, 0, 0],
				width: 8
			},
			{
				text: reset.toISOString(),
				padding: [0, 2, 0, 0],
				width: 26
			},
			{
				text: reset.toString()
			}
		);
	});
	console.log(tableRateLimit.toString());
};
module.exports = actionAccountRateLimit;
