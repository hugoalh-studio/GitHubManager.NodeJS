/*==================
[NodeJS] GitHub Manager - Passport
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	localStorage = require("./localstorage.js");
let token = localStorage.read("account") || "";
if (advancedDetermine.isString(token) !== true) {
	console.warn(`${chalk.bgYellow.black.bold("WARN")} Missing GitHub token (probably have not sign in yet)! May cause error in the beyond; Use \`github-manager account signin {token}\` to sign in. ([NodeJS] GitHub Manager)`);
};
let cat = {
	auth: token,
	userAgent: `NodeJS/${process.version.replace(/v/giu, "")} REST(@octokit)/18.0.6 GitHubManager(@hugoalh-studio)/0.1.0`
};
module.exports = function main() {
	return cat;
};
