const chalk = require("chalk"),
	commandList = require("../internal/command-list.js"),
	consoleTable = require("cliui"),
	header = require("../internal/header.js");
function help(input) {
	let method = input.line[1] || "";
	let commandListDisplay = [];
	switch (method.toLowerCase()) {
		case "":
			Object.values(commandList).forEach((element) => {
				commandListDisplay.push(...element);
			});
			break;
		case "account":
		case "acc":
			commandListDisplay.push(...commandList.account);
			break;
		case "help":
		case "h":
			commandListDisplay.push(...commandList.help);
			break;
		case "label":
			commandListDisplay.push(...commandList.label);
			break;
		case "localstorage":
		case "local":
		case "ls":
		case "storage":
			commandListDisplay.push(...commandList.localstorage);
			break;
		case "secret":
			commandListDisplay.push(...commandList.secret);
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list.`);
			process.exit(0);
	};
	let tableCommandList = new consoleTable({
		wrap: true
	});
	tableCommandList.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold("Command")}`,
			padding: [0, 2, 0, 0],
			width: 50
		},
		{
			text: `${chalk.underline.bold("Description")}`
		}
	);
	commandListDisplay.forEach((element) => {
		tableCommandList.div(
			{
				text: `-`,
				width: 2
			},
			{
				text: element[0],
				padding: [0, 2, 0, 0],
				width: 50
			},
			{
				text: element[1]
			}
		);
	});
	console.log(`${header}
${chalk.bold("Command List:")}
${tableCommandList.toString()}`);
};
module.exports = help;
