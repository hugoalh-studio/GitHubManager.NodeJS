/*==================
[NodeJS] GitHub Manager - Passport - GraphQL
	Language:
		NodeJS/10.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	localStorage = require("../localstorage/internal.js");
let token = localStorage.read("account") || "";
if (advancedDetermine.isString(token) !== true) {
	console.warn(`${chalk.bgYellow.black.bold("WARN")} Missing GitHub token (probably have not sign in yet)! May cause error in the beyond; Use \`github-manager account signin {token}\` to sign in. ([NodeJS] GitHub Manager)`);
};
let cat = {
	headers: {
		"authorization": `token ${token}`,
		"user-agent": `NodeJS/${process.version.replace(/v/giu, "")} GraphQL(@octokit)/4.5.7 GitHubManager(@hugoalh-studio)/1.0.1`
	}
};
module.exports = function main() {
	return cat;
};