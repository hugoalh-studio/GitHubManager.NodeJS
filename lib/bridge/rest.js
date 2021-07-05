const advancedDetermine = require("@hugoalh/advanced-determine"),
	ghmConsole = require("../internal/console.js"),
	ghmLanguage = require("../language/main.js"),
	ghmUserAgent = require("../internal/user-agent.js"),
	localStorage = require("../internal/local-storage.js"),
	OctokitREST = require("@octokit/rest").Octokit;
let githubREST;
/**
 * @private
 * @function bridgeRESTLoad
 * @returns {void}
 */
function bridgeRESTLoad() {
	let token = localStorage.read("account.passport") || "";
	if (advancedDetermine.isString(token) !== true) {
		ghmConsole.warning(ghmLanguage.warningMissingGitHubToken);
	};
	let octokitOption = {
		auth: token,
		log: {
			debug: () => { },
			error: (message, additional) => {
				ghmConsole.error(`${message}\n${additional}`);
			},
			info: () => { },
			warn: (message, additional) => {
				ghmConsole.warning(`${message}\n${additional}`);
			}
		},
		userAgent: ghmUserAgent
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
