const chalk = require("chalk"),
	githubREST = require("../../bridge/rest.js").read();
/**
 * @private
 * @function actionSecretGetPublicKey
 * @param {string} input
 * @returns {string}
 */
async function actionSecretGetPublicKey(input) {
	let data;
	if (input.search(/^@/giu) === 0) {
		data = await githubREST.actions.getOrgPublicKey({
			org: input.replace(/^@/giu, "")
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error}`);
			process.exit(0);
		});
	} else {
		let [repositoryOwner, repositoryName] = input.split("/");
		data = await githubREST.actions.getRepoPublicKey({
			owner: repositoryOwner,
			repo: repositoryName
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error}`);
			process.exit(0);
		});
	};
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! Maybe cause error in the beyond.`);
	};
	return data.data;
};
module.exports = actionSecretGetPublicKey;
