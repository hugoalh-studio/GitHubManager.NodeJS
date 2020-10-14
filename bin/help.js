/*==================
[NodeJS] GitHub Manager - Help
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk"),
	consoleTable = require("cliui");
module.exports = function main() {
	let commandListBuild = new consoleTable({
		wrap: true
	});
	commandListBuild.div("");
	commandListBuild.div(
		{
			text: `${chalk.bgWhite.black.bold("GitHub Manager (@hugoalh-studio), v0.0.1")}`
		}
	);
	commandListBuild.div(
		{
			text: ``,
			width: 1
		},
		{
			text: `${chalk.underline.bold("Command")}`,
			padding: [0, 2, 0, 0],
			width: 42
		},
		{
			text: `${chalk.underline.bold("Description")}`
		}
	);
	[
		[`account limit`, `Get the API rate-limit of this GitHub account.`],
		[`account signin {token}`, `Sign in a GitHub account via token.`],
		[`account signout`, `Sign out this GitHub account.`],
		[`account who`, `Get the username of this GitHub account.`],
		[`label add {repository/_local} {name} {color} {description}`, `Add a label.`],
		[`label delete {repository/_local} {name}`, `Delete a label.`],
		[`label deleteall {repository/_local}`, `Delete all of the labels.`],
		[`label list {repository/_local}`, `List all of the labels.`],
		[`label merge {source::repository/_local} ...{target::repository/_local}`, `Merge all of the labels.`],
		[`label replace {source::repository/_local} ...{target::repository/_local}`, `Replace all of the labels.`],
		[`label reset ...{repository/_local}`, `Reset to default labels.`],
		[`secret add {repository} {name} {value}`, `Add a secret.`],
		[`secret delete {repository} {name}`, `Delete a secret.`],
		[`secret deleteall {repository}`, `Delete all of the secrets.`],
		[`secret list {repository}`, `List all of the secrets.`],
		[`secret merge {source::repository} ...{target::repository}`, `Merge all of the secrets.`],
		[`secret replace {source::repository} ...{target::repository}`, `Replace all of the secrets.`],
		[`help / h`, `Display this information.`]
	].forEach((element) => {
		commandListBuild.div(
			{
				text: `-`,
				width: 1
			},
			{
				text: element[0],
				padding: [0, 2, 0, 0],
				width: 42
			},
			{
				text: element[1]
			}
		);
	});
	commandListBuild.div("");
	console.log(commandListBuild.toString());
};
/**
 * @private
 * @const {object} directory
 */
const directory = {
	storage: process.env.APPDATA
};
