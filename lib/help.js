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
	commandListBuild.div(
		{
			text: `${chalk.bgWhite.black.bold("GitHub Manager (@hugoalh-studio), v0.0.2")}`
		}
	);
	commandListBuild.div(
		{
			text: ``,
			width: 2
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
		[`account limit`, `Get the API rate limit of this GitHub account.`],
		[`account login {token}`, `Alias of \`account signin {token}\`.`],
		[`account logout`, `Alias of \`account signout\`.`],
		[`account signin {token}`, `Sign in a GitHub account via token.`],
		[`account signout`, `Sign out this GitHub account.`],
		[`account who`, `Alias of \`account whoami\`.`],
		[`account whoami`, `Get the username of this GitHub account.`],
		[`h`, `Alias of \`help\`.`],
		[`help`, `Display this information.`],
		[`label add {repository/localstorage} {name} {color} {description}`, `Add a label.`],
		[`label delete {repository/localstorage} ...{name}`, `Delete label(s).`],
		[`label deleteall ...{repository/localstorage}`, `Delete all of the labels.`],
		[`label list {repository/localstorage}`, `List all of the labels.`],
		[`label merge {source::repository/localstorage} ...{target::repository/localstorage}`, `Merge all of the labels.`],
		[`label replace {source::repository/localstorage} ...{target::repository/localstorage}`, `Replace all of the labels.`],
		[`label reset ...{repository/localstorage}`, `Reset to default labels.`],
		[`${chalk.gray(`secret add {repository} {name} {value}`)}`, `${chalk.gray(`Add a secret.`)}`],
		[`${chalk.gray(`secret delete {repository} ...{name}`)}`, `${chalk.gray(`Delete secret(s).`)}`],
		[`${chalk.gray(`secret deleteall ...{repository}`)}`, `${chalk.gray(`Delete all of the secrets.`)}`],
		[`${chalk.gray(`secret list {repository}`)}`, `${chalk.gray(`Alias of \`secret listmask {repository}\`.`)}`],
		[`${chalk.gray(`secret listmask {repository}`)}`, `${chalk.gray(`List all of the secrets with masked.`)}`],
		[`${chalk.gray(`secret listunmask {repository}`)}`, `${chalk.gray(`List all of the secrets without masked.`)}`],
		[`${chalk.gray(`secret merge {source::repository} ...{target::repository}`)}`, `${chalk.gray(`Merge all of the secrets.`)}`],
		[`${chalk.gray(`secret replace {source::repository} ...{target::repository}`)}`, `${chalk.gray(`Replace all of the secrets.`)}`]
	].forEach((element) => {
		commandListBuild.div(
			{
				text: `-`,
				width: 2
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
	console.log(`${commandListBuild.toString()}

${chalk.gray(`* Not yet implemented.`)}`);
};
