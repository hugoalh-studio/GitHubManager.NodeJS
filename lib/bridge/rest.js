const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../internal/console.js"),
	internalUserAgent = require("../internal/user-agent.js"),
	languageService = require("../language/main.js"),
	localStorage = require("../internal/local-storage.js"),
	OctokitRest = require("@octokit/rest").Octokit;
/**
 * @private
 * @function bridgeRest
 * @returns
 */
function bridgeRest() {
	let token = localStorage.read("account") || "";
	if (advancedDetermine.isString(token) !== true) {
		internalConsole.warning(languageService.warningMissingGitHubToken);
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
				internalConsole.warning(`${message}
${additional}`);
			}
		},
		userAgent: internalUserAgent
	};
	let githubRest = new OctokitRest(octokitOption).rest;
	return githubRest;
};
module.exports = bridgeRest;
