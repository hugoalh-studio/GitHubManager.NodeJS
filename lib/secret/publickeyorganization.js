/*==================
[NodeJS] GitHub Manager - Secret - Public Key Organization
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk"),
	passport = require("../passport.js")(),
	Octokit = require("@octokit/rest").Octokit;
const octokit = new Octokit(passport);
module.exports = async function main(organizationName) {
	let data = await octokit.actions.getOrgPublicKey({
		org: organizationName
	});
	if (data.status !== 200) {
		console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
	};
	if (typeof data.data.message !== "undefined") {
		console.error(`${chalk.bgRed.white.bold("ERROR")} ${data.data.message}! ([NodeJS] GitHub Manager (S-PKO-${organizationName.toUpperCase()}))`);
		process.exit(0);
	};
	return data.data;
};
