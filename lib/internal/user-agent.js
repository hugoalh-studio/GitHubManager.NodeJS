const internalVersion = require("./version.js");
const userAgent = `GitHubManager.NodeJSCLI/${internalVersion.semantic}`;
module.exports = userAgent;
