const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../internal/console.js"),
	internalUserAgent = require("../internal/user-agent.js"),
	languageService = require("../language/main.js"),
	localStorage = require("../internal/local-storage.js"),
	OctokitRest = require("@octokit/rest").Octokit;
let githubRest;
function bridgeRESTLoad() {
	let token = localStorage.read("account") || "";
	if (advancedDetermine.isString(token) !== true) {
		internalConsole.warning(languageService.warningMissingGitHubToken);
	};
	let octokitOption = {
		auth: token,
		log: {
			debug: () => { },
			error: (message, additional) => {
				internalConsole.error(`${message}\n${additional}`);
			},
			info: () => { },
			warn: (message, additional) => {
				internalConsole.warning(`${message}\n${additional}`);
			}
		},
		userAgent: internalUserAgent
	};
	githubRest = new OctokitRest(octokitOption).rest;
};
/**
 * @private
 * @function bridgeREST
 * @returns
 */
function bridgeRESTRead() {
	if (typeof githubRest !== "undefined") {
		return githubRest;
	};
	bridgeRESTLoad();
	return githubRest;
};
module.exports = bridgeRESTRead;
