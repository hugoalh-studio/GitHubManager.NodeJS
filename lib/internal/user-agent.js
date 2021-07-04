const internalVersion = require("./version.js");
const ghmUserAgent = `GitHubManager.NodeJSCLI/${internalVersion.semantic}`;
module.exports = ghmUserAgent;
