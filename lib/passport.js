/*==================
[NodeJS] GitHub Manager - Passport
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	localStorage = require("./localstorage.js");
/**
 * @private
 * @function main
 * @returns {object}
 */
module.exports = function main() {
	let token = localStorage.read("account");
	if (advancedDetermine.isString(token) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Missing GitHub token! Probably have not sign in yet; Use \`github-manager account signin {token}\` to sign in.`);
		process.exit(0);
	};
	return {
		auth: token,
		userAgent: `NodeJS/${process.version.replace(/v/giu, "")} REST(@octokit)/18.0.6 GitHubManager(@hugoalh-studio)/0.0.1`
	};
};
