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
			width: 58
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
		[`label add {repository/localstorage} {name} {color} [description]`, `Add a label in the repository or local storage.`],
		[`label delete {repository/localstorage} ...{name}`, `Delete label(s) in the repository or local storage.`],
		[`label deleteall ...{repository/localstorage}`, `Delete all of the labels in the repository(ies) or local storage.`],
		[`label list {repository/localstorage}`, `List all of the labels in the repository or local storage.`],
		[`label pullmerge {target::repository/localstorage} ...{source::repository/localstorage}`, `Pull merge all of the labels from the source repository(ies) or local storage, to the target repository or local storage.`],
		[`label pushmerge {source::repository/localstorage} ...{target::repository/localstorage}`, `Push merge all of the labels from the source repository or local storage, to the target repository(ies) or local storage.`],
		[`label replace {source::repository/localstorage} ...{target::repository/localstorage}`, `Replace all of the labels from the source repository or local storage, to the target repository(ies) or local storage.`],
		[`label reset ...{repository/localstorage}`, `Reset to default labels in the repository(ies) or local storage.`],
		[`secret add {repository/localstorage/organization} {name} {value}`, `Add a secret in the repository, local storage, or organization.`],
		[`secret delete {repository/localstorage/organization} ...{name}`, `Delete secret(s) in the repository, local storage, or organization.`],
		[`secret deleteall ...{repository/localstorage/organization}`, `Delete all of the secrets in the repository(ies), local storage, or organization(s).`],
		[`secret list {repository/localstorage/organization}`, `List all of the secrets in the repository, local storage, or organization.`],
		[`secret pushmerge ...{repository/organization}`, `Push merge all of the secrets from the local storage to the repository(ies) or organization(s).`],
		[`secret replace ...{repository/organization}`, `Replace all of the secrets from the local storage to the repository(ies) or organization(s).`]
	].forEach((element) => {
		commandListBuild.div(
			{
				text: `-`,
				width: 2
			},
			{
				text: element[0],
				padding: [0, 2, 0, 0],
				width: 58
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
			width: 34
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
		["pullmerge", "pull"],
		["pushmerge", "push"],
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
				width: 34
			},
			{
				text: element[1]
			}
		);
	});
	console.log(`${chalk.bgGray(`                                                `)}
${chalk.bgGray.white.bold("    GitHub Manager (@hugoalh-studio), v0.0.2    ")}
${chalk.bgGray(`                                                `)}
${chalk.bold("Command List:")}
${commandListBuild.toString()}

${chalk.bold("Common Alias List:")}
${aliasListBuild.toString()}`);
};
