const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../internal/console.js"),
	internalVersion = require("../internal/version.js"),
	OctokitRest = require("@octokit/rest").Octokit,
	storage = require("../internal/local-storage.js");
/**
 * @private
 * @function bridgeRest
 * @returns
 */
function bridgeRest() {
	let token = storage.read("account") || "";
	if (advancedDetermine.isString(token) !== true) {
		internalConsole.warning(`Missing GitHub token (probably have not sign in yet)! Maybe cause error in the beyond; Use \`account sign-in {token}\` to sign in.`);
	};
	let octokitOption = {
		auth: token,
		log: {
			debug: () => { },
			error: (message, additional) => {
				internalConsole.error(`${message}
${additional}`);
			},
			info: () => { },
			warn: (message, additional) => {
				internalConsole.warn(`${message}
${additional}`);
			}
		},
		userAgent: `GitHubManager.NodeJSCLI/${internalVersion.semantic}`
	};
	let githubRest = new OctokitRest(octokitOption).rest;
	return githubRest;
};
module.exports = bridgeRest;
