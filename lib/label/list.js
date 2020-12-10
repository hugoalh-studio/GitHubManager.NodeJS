/*==================
[NodeJS] GitHub Manager - Label - List
	Language:
		NodeJS/14.15.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	consoleTable = require("cliui");
function labelListDisplay(data) {
	if (advancedDetermine.isObjectPair(data) !== true) {
		console.log(`${chalk.bgBlue.white.bold("INFO")} No data! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let tableLabel = new consoleTable({
		wrap: true
	});
	tableLabel.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold("Name")}`,
			padding: [0, 2, 0, 0],
			width: 42
		},
		{
			text: `${chalk.underline.bold("Color")}`,
			padding: [0, 2, 0, 0],
			width: 10
		},
		{
			text: `${chalk.underline.bold("Description")}`
		}
	);
	Object.keys(data).sort().forEach((key) => {
		let name = key,
			color = data[key]["color"],
			description = data[key]["description"] || "";
		tableLabel.div(
			{
				text: `-`,
				width: 2
			},
			{
				text: name,
				padding: [0, 2, 0, 0],
				width: 42
			},
			{
				text: `${chalk.bgHex(`#${color.toUpperCase()}`).bold("　")}${color.toLowerCase()}`,
				padding: [0, 2, 0, 0],
				width: 10
			},
			{
				text: description
			}
		);
	});
	console.log(tableLabel.toString());
};
async function labelListNetwork(repositoryOwner, repositoryName, internalUse) {
	const passport = require("../passport/graphql.js")(),
		Octokit = require("@octokit/graphql").graphql;
	const octokit = Octokit.defaults(passport);
	let cursor = "",
		result = {},
		totalCount;
	do {
		let response = await octokit(
			`query ($owner: String!, $repo: String!) {
			repository(name: $repo, owner: $owner) {
				labels(first: 100, orderBy: {field: NAME, direction: ASC}${(cursor.length > 0) ? `, after: "${cursor}"` : ""}) {
					nodes {
						color
						description
						name
					}
					pageInfo {
						endCursor
						hasNextPage
					}
					totalCount
				}
			}
		}`,
			{
				owner: repositoryOwner,
				repo: repositoryName
			}
		).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
			process.exit(0);
		});
		response.repository.labels.nodes.forEach((element) => {
			result[element["name"]] = {
				"color": element["color"],
				"description": element["description"] || ""
			};
		});
		if (response.repository.labels.pageInfo.hasNextPage === true) {
			cursor = response.repository.labels.pageInfo.endCursor;
		} else {
			cursor = "";
		};
		if (typeof totalCount === "undefined") {
			totalCount = response.repository.labels.totalCount;
			if (totalCount > 100) {
				console.log(`${chalk.bgBlue.white.bold("INFO")} Repository "${repositoryOwner}/${repositoryName}" has ${totalCount} labels, this action may take longer than usual! ([NodeJS] GitHub Manager)`);
			};
		};
	} while (cursor.length > 0);
	/* await octokit.paginate(
		octokit.issues.listLabelsForRepo,
		{
			owner: repositoryOwner,
			per_page: 100,
			repo: repositoryName
		},
		(response) => {
			if (response.status !== 200) {
				console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${response.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
			};
			response.data.forEach((element) => {
				result[element["name"]] = {
					"color": element["color"],
					"description": element["description"] || ""
				};
			});
		}
	).catch((error) => {
		console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
		process.exit(0);
	});
	let totalPage = 1;
	for (let index = 0; index < totalPage; index++) {
		let data = await octokit.issues.listLabelsForRepo({
			owner: repositoryOwner,
			page: index + 1,
			per_page: 100,
			repo: repositoryName
		}).catch((error) => {
			console.error(`${chalk.bgRed.white.bold("G.O.E.")} ${error} ([NodeJS] GitHub Manager)`);
			process.exit(0);
		});
		if (data.status !== 200) {
			console.warn(`${chalk.bgYellow.black.bold("WARN")} Receive status code ${data.status}! May cause error in the beyond. ([NodeJS] GitHub Manager)`);
		};
		data.data.forEach((element) => {
			result[element["name"]] = {
				"color": element["color"],
				"description": element["description"] || ""
			};
		});
		if (index === 0) {
			if (advancedDetermine.isString(data.headers.link) === true) {
				if (data.headers.link.search(/\?page=(\d+)&per_page=100>; rel="last"/giu) !== -1) {
					let totalPageData = data.headers.link.match(/\?page=(\d+)&per_page=100>; rel="last"/giu)[0].split("&")[0].split("=")[1];
					totalPage = Number(totalPageData);
					console.log(`${chalk.bgBlue.white.bold("INFO")} Repository "${repositoryOwner}/${repositoryName}" has at most ${totalPage * 100} labels, this action may take longer than usual! ([NodeJS] GitHub Manager)`);
				};
			};
		};
	}; */
	if (internalUse === true) {
		return result;
	};
	return labelListDisplay(result);
};
function labelList(repository, internalUse = false) {
	if (advancedDetermine.isString(repository) !== true) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository" must be type of string (non-nullable)! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	switch (repository.toLowerCase()) {
		case "default":
		case "def":
			const labelDefault = require("./defaultlabel.js");
			return ((internalUse === true) ? labelDefault : labelListDisplay(labelDefault));
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			const localStorage = require("../localstorage/internal.js");
			let data = localStorage.read("label");
			return ((internalUse === true) ? data : labelListDisplay(data));
		default:
			if (repository.search(/\(org(anization)?\)[\w\d\-._]+/giu) === 0) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Label is not support organization! ([NodeJS] GitHub Manager)`);
				break;
			};
			if (repository.search(/^[\w\d\-._]+\/[\w\d\-._]+$/gu) === 0) {
				let [owner, repositoryName] = repository.split("/");
				return labelListNetwork(owner, repositoryName, internalUse);
			};
			console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value is not match the require pattern! ([NodeJS] GitHub Manager)`);
			break;
	};
};
module.exports = labelList;
