/*==================
[NodeJS] GitHub Manager - Client
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	localStorage = require("./localstorage.js"),
	Octokit = require("@octokit/rest").Octokit;
/**
 * @private
 * @function main
 * @returns {Octokit}
 */
module.exports = function main() {
	let token = localStorage.read("account");
	if (advancedDetermine.isString(token) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Missing GitHub token! Probably have not sign in yet; Use \`github-manager account signin {token}\` to sign in.`);
		process.exit(0);
	};
	return new Octokit({
		auth: token,
		userAgent: `NodeJS/${process.version.replace(/v/giu, "")} REST(@octokit)/18.0.6 GitHubManager(@hugoalh-studio)/0.0.1`
	});
};
