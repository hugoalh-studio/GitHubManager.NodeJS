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
			text: `==================================================
${chalk.bold("GitHub Manager (@hugoalh-studio), v0.0.2")}
==================================================`
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
			width: 50
		},
		{
			text: `${chalk.underline.bold("Description")}`
		}
	);
	[
		[`account limit`, `Get the API rate limit status of this GitHub account.`],
		[`${chalk.gray(`account login {token}`)}`, `${chalk.gray(`Alias of \`account signin {token}\`.`)}`],
		[`${chalk.gray(`account logout`)}`, `${chalk.gray(`Alias of \`account signout\`.`)}`],
		[`account signin {token}`, `Sign in a GitHub account via personal access token.`],
		[`account signout`, `Sign out this GitHub account.`],
		[`${chalk.gray(`account who`)}`, `${chalk.gray(`Alias of \`account whoami\`.`)}`],
		[`account whoami`, `Get the username of this GitHub account.`],
		[`${chalk.gray(`h`)}`, `${chalk.gray(`Alias of \`help\`.`)}`],
		[`help`, `Display this information.`],
		[`label add {repository/localstorage} {name} {color} {description}`, `Add a label in a repository or local storage.`],
		[`${chalk.gray(`label del {repository/localstorage} ...{name}`)}`, `${chalk.gray(`Alias of \`label delete {repository/localstorage} ...{name}\`.`)}`],
		[`${chalk.gray(`label delall ...{repository/localstorage}`)}`, `${chalk.gray(`Alias of \`label deleteall ...{repository/localstorage}\`.`)}`],
		[`label delete {repository/localstorage} ...{name}`, `Delete label(s) in a repository or local storage.`],
		[`label deleteall ...{repository/localstorage}`, `Delete all of the labels in repository(ies) or local storage.`],
		[`label list {repository/localstorage}`, `List all of the labels in a repository or local storage.`],
		[`label merge {source::repository/localstorage} ...{target::repository/localstorage}`, `Merge all of the labels from source repository or local storage to target repository(ies) or local storage (same source and target is not possible).`],
		[`label replace {source::repository/localstorage} ...{target::repository/localstorage}`, `Replace all of the labels from source repository or local storage to target repository(ies) or local storage (same source and target is not possible).`],
		[`label reset ...{repository/localstorage}`, `Reset to default labels in repository(ies) or local storage.`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret add {repository/organization} {name} {value}`, `Add a secret in a repository or organization.`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} ${chalk.gray(`secret del {repository/organization} ...{name}`)}`, `${chalk.gray(`Alias of \`secret delete {repository/organization} ...{name}\`.`)}`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} ${chalk.gray(`secret delall ...{repository/organization}`)}`, `${chalk.gray(`Alias of \`secret deleteall ...{repository/organization}\`.`)}`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret delete {repository/organization} ...{name}`, `Delete secret(s) in a repository or organization.`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} secret deleteall ...{repository/organization}`, `Delete all of the secrets in repository(ies) or organization(s).`],
		[`${chalk.bgMagenta.white.bold("W.I.P")} ${chalk.gray(`secret list {repository/organization}`)}`, `${chalk.gray(`Alias of \`secret listmask {repository/organization}\`.`)}`],
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
	console.log(`${commandListBuild.toString()}`);
};
