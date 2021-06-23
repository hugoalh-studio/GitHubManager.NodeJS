const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../internal/console.js"),
	internalUserAgent = require("../internal/user-agent.js"),
	languageService = require("../language/main.js"),
	localStorage = require("../internal/local-storage.js"),
	OctokitGraphQL = require("@octokit/graphql").graphql;
/**
 * @private
 * @function bridgeGraphQL
 * @returns
 */
function bridgeGraphQL() {
	let token = localStorage.read("account") || "";
	if (advancedDetermine.isString(token) !== true) {
		internalConsole.warning(languageService.warningMissingGitHubToken);
	};
	let octokitOption = {
		headers: {
			"authorization": `token ${token}`,
			"user-agent": internalUserAgent
		}
	};
	let githubGraphQL = OctokitGraphQL.defaults(octokitOption);
	return githubGraphQL;
};
module.exports = bridgeGraphQL;
