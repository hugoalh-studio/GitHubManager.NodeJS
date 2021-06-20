const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../internal/console.js"),
	storage = require("../internal/storage.js"),
	internalUserAgent = require("../internal/user-agent.js");
let token = storage.read("account") || "";
if (advancedDetermine.isString(token) !== true) {
	internalConsole.warning(`Missing GitHub token (probably have not sign in yet)! Maybe cause error in the beyond; Use \`account sign-in {token}\` to sign in.`);
};
let cat = {
	headers: {
		"authorization": `token ${token}`,
		"user-agent": internalUserAgent
	}
};
function passportGraphQL() {
	return cat;
};
module.exports = passportGraphQL;
