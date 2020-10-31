/*==================
[NodeJS] GitHub Manager - Help
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk"),
	consoleTable = require("cliui");
module.exports = function main() {
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
			width: 58
		},
		{
			text: `${chalk.underline.bold("Description")}`
		}
	);
	[
		[`account limit`, `Get the API rate limit status of this GitHub account.`],
		[`account lock {password}`, `Protect the GitHub account's personal access token with new password. Password should not be the GitHub account's password, and must be at least 8 charactars (case-sensitive).`],
		[`account signin {token}`, `Sign in a GitHub account via personal access token.`],
		[`account signout`, `Sign out this GitHub account.`],
		[`account unlock {password}`, `Unprotect the GitHub account's personal access token with password that previously setted (case-sensitive).`],
		[`account whoami`, `Get the username of this GitHub account.`],
		[`help`, `Display this information.`],
		[`label add {target} {name} {color} [description]`, `Add a label in the repository or local storage.`],
		[`label delete {target} ...{name}`, `Delete label(s) in the repository or local storage.`],
		[`label deleteall ...{target}`, `Delete all of the labels in the repository(ies) or local storage.`],
		[`label deletecross {name} ...{target}`, `Delete label in the repository(ies) or local storage.`],
		[`label list {target}`, `List all of the labels in the repository or local storage.`],
		[`label pullmerge {target} ...{source}`, `Pull merge all of the labels from the source repository(ies) or local storage, to the target repository or local storage.`],
		[`label pushmerge {source} ...{target}`, `Push merge all of the labels from the source repository or local storage, to the target repository(ies) or local storage.`],
		[`label replace {source} ...{target}`, `Replace all of the labels from the source repository or local storage, to the target repository(ies) or local storage.`],
		[`label reset ...{target}`, `Reset to default labels in the repository(ies) or local storage.`],
		[`localstorage lock {password}`, `Protect the GitHub account's personal access token and secret(s) with new password. Password should not be the GitHub account's password, and must be at least 8 charactars (case-sensitive).`],
		[`localstorage unlock {password}`, `Unprotect the GitHub account's personal access token and secret(s) with password that previously setted (case-sensitive).`],
		[`secret add {target} {name} {value}`, `Add a secret in the repository, local storage, or organization.`],
		[`secret delete {target} ...{name}`, `Delete secret(s) in the repository, local storage, or organization.`],
		[`secret deleteall ...{target}`, `Delete all of the secrets in the repository(ies), local storage, or organization(s).`],
		[`secret deletecross {name} ...{target}`, `Delete secret in the repository(ies), local storage, or organization(s).`],
		[`secret list {target}`, `List all of the secrets in the repository, local storage, or organization.`],
		[`secret lock {password}`, `Protect the secret(s) with new password. Password must be at least 8 charactars (case-sensitive).`],
		[`secret pushmerge ...{target}`, `Push merge all of the secrets from the local storage to the repository(ies) or organization(s).`],
		[`secret replace ...{target}`, `Replace all of the secrets from the local storage to the repository(ies) or organization(s).`],
		[`secret unlock {password}`, `Unprotect the secret(s) with password that previously setted (case-sensitive).`]
	].forEach((element) => {
		tableCommandList.div(
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
	let tableAliasList = new consoleTable({
		wrap: true
	});
	tableAliasList.div(
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
		["deletecross", "- delcr\n- delcross\n- deletecr"],
		["help", "h"],
		["localstorage", "- local\n- ls\n- storage"],
		["organization:", "- o:\n- org:"],
		["pullmerge", "pull"],
		["pushmerge", "push"],
		["signin", "login"],
		["signout", "logout"],
		["whoami", "who"]
	].forEach((element) => {
		tableAliasList.div(
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
${chalk.bgGray.white.bold("    GitHub Manager (@hugoalh-studio), v0.2.0    ")}
${chalk.bgGray(`                                                `)}
${chalk.bold("Command List:")}
${tableCommandList.toString()}

${chalk.bold("Common Alias List:")}
${tableAliasList.toString()}`);
};
