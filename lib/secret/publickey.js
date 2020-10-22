/*==================
[NodeJS] GitHub Manager - Secret - Public Key
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk"),
	passport = require("../passport.js")(),
	Octokit = require("@octokit/rest").Octokit;
const octokit = new Octokit(passport);
module.exports = async function main(...inputs) {
	let data;
	switch (inputs.length) {
		case 1:
			data = await octokit.actions.getOrgPublicKey({
				org: inputs[0]
			});
			break;
		case 2:
			data = await octokit.actions.getRepoPublicKey({
				owner: inputs[0],
				repo: inputs[1]
			});
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Application error! Please report to author. ([NodeJS] GitHub Manager)`);
			process.exit(0);
	};
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
	};
	if (typeof data.data.message !== "undefined") {
		console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message}! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	return data.data;
};
