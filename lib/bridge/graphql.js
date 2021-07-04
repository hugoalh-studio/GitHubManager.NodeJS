const advancedDetermine = require("@hugoalh/advanced-determine"),
	ghmConsole = require("../internal/console.js"),
	ghmLanguage = require("../language/main.js"),
	ghmUserAgent = require("../internal/user-agent.js"),
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
		ghmConsole.warning(ghmLanguage.warningMissingGitHubToken);
	};
	let octokitOption = {
		headers: {
			"authorization": `token ${token}`,
			"user-agent": ghmUserAgent
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
