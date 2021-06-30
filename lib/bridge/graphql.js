const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../internal/console.js"),
	internalUserAgent = require("../internal/user-agent.js"),
	languageService = require("../language/main.js"),
	localStorage = require("../internal/local-storage.js"),
	OctokitGraphQL = require("@octokit/graphql").graphql;
let githubGraphQL;
/**
 * @private
 * @function bridgeGraphQLLoad
 * @returns {void}
 */
function bridgeGraphQLLoad() {
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
	githubGraphQL = OctokitGraphQL.defaults(octokitOption);
};
/**
 * @private
 * @function bridgeGraphQL
 * @returns
 */
function bridgeGraphQLRead() {
	if (typeof githubGraphQL !== "undefined") {
		return githubGraphQL;
	};
	bridgeGraphQLLoad();
	return githubGraphQL;
};
module.exports = {
	load: bridgeGraphQLLoad,
	read: bridgeGraphQLRead
};
