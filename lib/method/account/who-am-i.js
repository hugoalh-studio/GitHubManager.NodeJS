const internalConsole = require("../../internal/console.js");
async function accountWhoAmI() {
	const passport = require("../../bridge/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let data = await octokit.users.getAuthenticated().catch((error) => {
		internalConsole.error(`${error}`);
		process.exit(0);
	});
	if (data.status !== 200) {
		internalConsole.warning(`Receive status code ${data.status}! May cause error in the beyond.`);
	};
	console.log(`Welcome, ${data.data.login}!`);
};
module.exports = accountWhoAmI;
