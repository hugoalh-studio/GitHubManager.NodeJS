/*==================
[NodeJS] GitHub Manager - Passport - REST
	Language:
		NodeJS/14.15.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	localStorage = require("../localstorage/internal.js");
let token = localStorage.read("account") || "";
if (advancedDetermine.isString(token) !== true) {
	console.warn(`${chalk.bgYellow.black.bold("WARN")} Missing GitHub token (probably have not sign in yet)! May cause error in the beyond; Use \`account signin {token}\` to sign in. ([NodeJS] GitHub Manager)`);
};
let cat = {
	auth: token,
	log: {
		debug: () => { },
		error: (message, additional) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${message} ([NodeJS] GitHub Manager)
${additional}`);
		},
		info: () => { },
		warn: (message, additional) => {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} ${message} ([NodeJS] GitHub Manager)
${additional}`);
		}
	},
	userAgent: `NodeJS/${process.version.replace(/v/giu, "")} REST(@octokit)/18.0.7 GitHubManager(@hugoalh-studio)/1.1.0`
};
function passportREST() {
	return cat;
};
module.exports = passportREST;
