const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	storage = require("../internal/storage.js");
let token = storage.read("account") || "";
if (advancedDetermine.isString(token) !== true) {
	console.warn(`${chalk.bgYellow.black.bold("WARN")} Missing GitHub token (probably have not sign in yet)! May cause error in the beyond; Use \`account signin {token}\` to sign in.`);
};
let cat = {
	auth: token,
	log: {
		debug: () => { },
		error: (message, additional) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${message}
${additional}`);
		},
		info: () => { },
		warn: (message, additional) => {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} ${message}
${additional}`);
		}
	},
	userAgent: `GitHubManager/1.1.0`
};
function passportREST() {
	return cat;
};
module.exports = passportREST;
