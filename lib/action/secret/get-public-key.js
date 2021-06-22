const chalk = require("chalk"),
	passport = require("../../bridge/rest.js")(),
	Octokit = require("@octokit/rest").Octokit;
const octokit = new Octokit(passport);
async function secretPublicKey(...inputs) {
	let data;
	switch (inputs.length) {
		case 1:
			data = await octokit.actions.getOrgPublicKey({
				org: inputs[0]
			}).catch((error) => {
				console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error}`);
				process.exit(0);
			});
			break;
		case 2:
			data = await octokit.actions.getRepoPublicKey({
				owner: inputs[0],
				repo: inputs[1]
			}).catch((error) => {
				console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error}`);
				process.exit(0);
			});
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Application error! Please report to author.`);
			process.exit(0);
	};
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! Maybe cause error in the beyond.`);
	};
	return data.data;
};
module.exports = secretPublicKey;
