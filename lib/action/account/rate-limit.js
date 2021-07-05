const chalk = require("chalk"),
	consoleTable = require("cliui"),
	ghmConsole = require("../../internal/console.js"),
	ghmLanguage = require("../../language/main.js");
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
		ghmConsole.warning(ghmLanguage.warningUnexpectedNetworkStatusCode, { statusCode: data.status });
	};
	if (typeof commandLine.option.table === "string" && commandLine.option.table.search(/^(legacy|node|tradition(al)?)$/giu) === 0) {
		let tableRateLimit = [];
		Object.keys(data.data.resources).forEach((key) => {
			let reset = new Date(data.data.resources[key].reset * 1000),
				tableRow = {};
			tableRow[ghmLanguage.accountRateLimitTableHeaderResource] = key;
			tableRow[ghmLanguage.accountRateLimitTableHeaderLimit] = data.data.resources[key].limit;
			tableRow[ghmLanguage.accountRateLimitTableHeaderRemain] = data.data.resources[key].remaining;
			tableRow[ghmLanguage.accountRateLimitTableHeaderResetAtISOUTC] = reset.toISOString();
			tableRow[ghmLanguage.accountRateLimitTableHeaderResetAtLocale] = reset.toString();
			tableRateLimit.push(tableRow);
		});
		console.table(tableRateLimit);
	} else {
		let tableRateLimit = new consoleTable({ wrap: true });
		tableRateLimit.div(
			{
				text: "",
				width: 2
			},
			{
				text: chalk.underline.bold(ghmLanguage.accountRateLimitTableHeaderResource),
				padding: [0, 2, 0, 0],
				width: 26
			},
			{
				text: chalk.underline.bold(ghmLanguage.accountRateLimitTableHeaderLimit),
				padding: [0, 2, 0, 0],
				width: 8
			},
			{
				text: chalk.underline.bold(ghmLanguage.accountRateLimitTableHeaderRemain),
				padding: [0, 2, 0, 0],
				width: 8
			},
			{
				text: chalk.underline.bold(ghmLanguage.accountRateLimitTableHeaderResetAtISOUTC),
				padding: [0, 2, 0, 0],
				width: 26
			},
			{
				text: chalk.underline.bold(ghmLanguage.accountRateLimitTableHeaderResetAtLocale)
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
		console.log(`\n${tableRateLimit.toString()}\n`);
	};
};
module.exports = actionAccountRateLimit;
