/*==================
[NodeJS] GitHub Manager - Label - List
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk");
module.exports = async function list(repository) {
	if (repository.search(/^\S+\/\S+$/gu) !== 0) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "repository"'s value does not match the pattern!`);
	};
	let [owner, name] = repository.split("/");
	let result = [];
	let totalPage = 1;
	for (let index = 0; index < totalPage; index++) {
		let data = mats.execute(
			require.resolve("../mats/label_list_remote.js"),
			JSON.stringify({
				owner: owner,
				repo: name,
				per_page: 100,
				page: index + 1
			})
		);
		data = JSON.parse(data);
		data.data.forEach((element, index) => {
			result.push({
				name: element.name,
				color: element.color,
				description: element.description
			});
		});
		if (typeof data.link === "string" && data.link.search(`rel="next"`) !== -1) {
			totalPage += 1;
		};
	};
	return result;
};
