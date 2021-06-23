const internalConsole = require("../../internal/console.js"),
	languageService = require("../../language/main.js");
/**
 * @private
 * @function actionAccountWhoAmI
 * @async
 * @returns {void}
 */
async function actionAccountWhoAmI(commandLine) {
	const githubRest = require("../../bridge/rest.js")();
	let data = await githubRest.users.getAuthenticated().catch((error) => {
		internalConsole.error(error);
		if (commandLine.flag.includes("wizard")) {
			require("../../wizard/account.js")(commandLine);
		} else {
			process.exit((commandLine.flag.includes("github-action") ? 1 : 0));
		};
	});
	if (data.status !== 200) {
		internalConsole.warning(`${languageService.warningUnexpectedNetworkStatusCode_1}${data.status}${languageService.warningUnexpectedNetworkStatusCode_2}`);
	};
	console.log(`Welcome, ${data.data.login}!`);
};
module.exports = actionAccountWhoAmI;
