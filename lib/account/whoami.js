/*==================
[NodeJS] GitHub Manager - Account - Who Am I
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk");
module.exports = async function accountWhoAmI() {
	const passport = require("../passport/rest.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let data = await octokit.users.getAuthenticated().catch((error) => {
		console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
		process.exit(0);
	});
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
	};
	console.log(`Welcome, ${data.data.login}!`);
};
