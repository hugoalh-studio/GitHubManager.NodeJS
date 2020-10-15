/*==================
[NodeJS] GitHub Manager - Account - Who Am I
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk"),
	Octokit = require("../client.js")();
const octokit = new Octokit();
module.exports = async function main() {
	let data = await octokit.users.getAuthenticated();
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond.`);
	};
	console.log(`Welcome, ${data.data.login}!`);
};
