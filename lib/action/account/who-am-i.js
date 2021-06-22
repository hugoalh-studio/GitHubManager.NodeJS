const internalConsole = require("../../internal/console.js"),
	languageService = require("../../language/main.js");
/**
 * @private
 * @function actionAccountWhoAmI
 * @async
 * @returns {void}
 */
async function actionAccountWhoAmI() {
	const githubRest = require("../../bridge/rest.js")();
	let data = await githubRest.users.getAuthenticated().catch((error) => {
		throw new Error(error);
	});
	if (data.status !== 200) {
		internalConsole.warning(`Receive status code ${data.status}! Maybe cause error in the beyond.`);
	};
	console.log(`Welcome, ${data.data.login}!`);
};
module.exports = actionAccountWhoAmI;
