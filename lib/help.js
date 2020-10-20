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
	[
		[`account limit`, `Get the API rate limit status of this GitHub account.`],
		[`account signin {token}`, `Sign in a GitHub account via personal access token.`],
		[`account signout`, `Sign out this GitHub account.`],
		[`account whoami`, `Get the username of this GitHub account.`],
		[`help`, `Display this information.`],
		[`label add {repository/localstorage} {name} {color} {description}`, `Add a label in a repository or local storage.`],
		[`label delete {repository/localstorage} ...{name}`, `Delete label(s) in a repository or local storage.`],
		[`label deleteall ...{repository/localstorage}`, `Delete all of the labels in repository(ies) or local storage.`],
		[`label list {repository/localstorage}`, `List all of the labels in a repository or local storage.`],
		[`label merge {source::repository/localstorage} ...{target::repository/localstorage}`, `Merge all of the labels from source repository or local storage to target repository(ies) or local storage (same source and target is not possible).`],
		[`label replace {source::repository/localstorage} ...{target::repository/localstorage}`, `Replace all of the labels from source repository or local storage to target repository(ies) or local storage (same source and target is not possible).`],
		[`label reset ...{repository/localstorage}`, `Reset to default labels in repository(ies) or local storage.`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret add {repository/organization} {name} {value}`, `Add a secret in a repository or organization.`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret delete {repository/organization} ...{name}`, `Delete secret(s) in a repository or organization.`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret deleteall ...{repository/organization}`, `Delete all of the secrets in repository(ies) or organization(s).`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret listmask {repository/organization}`, `List all of the secrets in a repository or organization with masked.`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret listunmask {repository/organization}`, `List all of the secrets in a repository or organization without masked.`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret merge {source::repository/organization} ...{target::repository/organization}`, `Merge all of the secrets from source repository or organization to target repository(ies) or organization(s) (same source and target is not possible).`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret replace {source::repository/organization} ...{target::repository/organization}`, `Replace all of the secrets from source repository or organization to target repository(ies) or organization(s) (same source and target is not possible).`]
	].forEach((element) => {
		commandListBuild.div(
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
	let aliasListBuild = new consoleTable({
		wrap: true
	});
	aliasListBuild.div(
		{
			text: ``,
			width: 2
		},
		{
			text: `${chalk.underline.bold("Original")}`,
			padding: [0, 2, 0, 0],
			width: 42
		},
		{
			text: `${chalk.underline.bold("Alias")}`
		}
	);
	[
		["account", "acc"],
		["delete", "del"],
		["deleteall", "delall"],
		["help", "h"],
		["localstorage", "- local\n- ls\n- storage"],
		["organization:", "- o:\n- org:"],
		["secret listmask", "secret list"],
		["signin", "login"],
		["signout", "logout"],
		["whoami", "who"]
	].forEach((element) => {
		aliasListBuild.div(
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
	console.log(`==================================================
${chalk.bold("GitHub Manager (@hugoalh-studio), v0.0.2")}
==================================================

${chalk.bold("Command List:")}
${commandListBuild.toString()}

${chalk.bold("Command Alias List:")}
${aliasListBuild.toString()}`);
};
