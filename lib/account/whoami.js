/*==================
[NodeJS] GitHub Manager - Account - Who Am I
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk");
module.exports = async function main() {
	const passport = require("../passport.js")(),
		Octokit = require("@octokit/rest").Octokit;
	const octokit = new Octokit(passport);
	let data = await octokit.users.getAuthenticated();
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond.`);
	};
	if (data.data.message) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message} (Code: AC-W)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	console.log(`Welcome, ${data.data.login}!`);
};
