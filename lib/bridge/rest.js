const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../internal/console.js"),
	internalUserAgent = require("../internal/user-agent.js"),
	ghmLanguage = require("../language/main.js"),
	localStorage = require("../internal/local-storage.js"),
	OctokitREST = require("@octokit/rest").Octokit;
let githubREST;
/**
 * @private
 * @function bridgeRESTLoad
 * @returns {void}
 */
function bridgeRESTLoad() {
	let token = localStorage.read("account") || "";
	if (advancedDetermine.isString(token) !== true) {
		internalConsole.warning(ghmLanguage.warningMissingGitHubToken);
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
	githubREST = new OctokitREST(octokitOption).rest;
};
/**
 * @private
 * @function bridgeREST
 * @returns
 */
function bridgeRESTRead() {
	if (typeof githubREST !== "undefined") {
		return githubREST;
	};
	bridgeRESTLoad();
	return githubREST;
};
module.exports = {
	load: bridgeRESTLoad,
	read: bridgeRESTRead
};
