const ghmConsole = require("../../internal/console.js"),
	ghmLanguage = require("../../language/main.js");
/**
 * @private
 * @function actionAccountWhoAmI
 * @async
 * @param {object} commandLine
 * @returns {void}
 */
async function actionAccountWhoAmI(commandLine) {
	const githubREST = require("../../bridge/rest.js").read();
	let data = await githubREST.users.getAuthenticated().catch((error) => {
		throw new Error(error);
	});
	if (data.status !== 200) {
		ghmConsole.warning(ghmLanguage.warningUnexpectedNetworkStatusCode, { statusCode: data.status });
	};
	console.log(`Welcome, ${data.data.login}!`);
};
module.exports = actionAccountWhoAmI;
