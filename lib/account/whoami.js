/*==================
[NodeJS] GitHub Manager - Account - Who Am I
	Language:
		NodeJS/10.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
let cache;
module.exports = async function main(internalUse = false) {
	if (typeof cache === "undefined") {
		const passport = require("../passport.js")(),
			Octokit = require("@octokit/rest").Octokit;
		const octokit = new Octokit(passport);
		let role = [];
		let dataUser = await octokit.users.getAuthenticated().catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
			process.exit(0);
		});
		if (dataUser.status !== 200) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${dataUser.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
		role.push(dataUser.data.login);
		let totalPage = 1;
		try {
			for (let index = 0; index < totalPage; index++) {
				let dataOrg = await octokit.orgs.listMembershipsForAuthenticatedUser({
					page: index + 1,
					per_page: 100,
					state: "active"
				}).catch((error) => {
					console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
					process.exit(0);
				});
				if (dataOrg.status !== 200) {
					console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${dataOrg.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
				};
				dataOrg.data.forEach((element) => {
					if (element.role === "admin") {
						role.push(element.organization.url.replace("https://api.github.com/orgs/", ""));
					};
				});
				if (index === 0) {
					if (advancedDetermine.isString(dataOrg.headers.link) === true) {
						if (dataOrg.headers.link.search(/\?page=(\d+)&per_page=100>; rel="last"/giu) !== -1) {
							let totalPageData = dataOrg.headers.link.match(/\?page=(\d+)&per_page=100>; rel="last"/giu)[0].split("&")[0].split("=")[1];
							totalPage = Number(totalPageData);
							console.log(`${chalk.bgBlue.white.bold("INFO")} User has joined at most ${totalPage * 100} organizations, this action may take longer than usual! ([NodeJS] GitHub Manager)`);
						};
					};
				};
			};
		} catch (error) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Cannot access organization information! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
		cache = role;
	};
	if (internalUse === true) {
		return cache;
	};
	if (cache.length === 0) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} GitHub deny any access! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	console.log(`${chalk.bold("Welcome:")} ${cache.join(", ")}`);
};
