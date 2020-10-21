/*==================
[NodeJS] GitHub Manager - Secret - List
	Language:
		NodeJS/10.0.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	chalk = require("chalk"),
	consoleTable = require("cliui");
function display(data) {
	if (advancedDetermine.isObjectPair(data) !== true) {
		console.log(`${chalk.bgBlue.white.bold("INFO")} No data! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let commandListBuild = new consoleTable({
		wrap: true
	});
	commandListBuild.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold("Key")}`,
			padding: [0, 2, 0, 0],
			width: 42
		},
		{
			text: `${chalk.underline.bold("Value")}`
		}
	);
	Object.keys(data).sort().forEach((key) => {
		commandListBuild.div(
			{
				text: `-`,
				width: 2
			},
			{
				text: key,
				padding: [0, 2, 0, 0],
				width: 42
			},
			{
				text: data[key]
			}
		);
	});
	console.log(commandListBuild.toString());
};
function main(internalUse = false) {
	const localStorage = require("../localstorage.js");
	let data = localStorage.read("secret");
	return (
		(internalUse === true) ? data : display(data)
	);
};
module.exports = main;
