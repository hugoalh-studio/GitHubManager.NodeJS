/*==================
[NodeJS] GitHub Manager - Help - Command List
	Language:
		NodeJS/14.15.0
==================*/
const account = [
		[`account limit`, `Get the API rate limit status of this GitHub account.`],
		[`account lock {key}`, `Protect the GitHub account's personal access token with new key. Key should not be the GitHub account's password, and must be at least 8 charactars (case-sensitive).`],
		[`account signin {token}`, `Sign in a GitHub account via personal access token.`],
		[`account signout`, `Sign out this GitHub account.`],
		[`account unlock {key}`, `Unprotect the GitHub account's personal access token with key that previously setted (case-sensitive).`],
		[`account whoami`, `Get the username of this GitHub account.`]
	],
	help = [
		[`help`, `Display this information.`]
	],
	label = [
		[`label add {target} {name} {color} [description]`, `Add a label in the repository or local storage.`],
		[`label delete {target} ...{name}`, `Delete label(s) in the repository or local storage.`],
		[`label deleteall ...{target}`, `Delete all of the labels in the repository(ies) or local storage.`],
		[`label deletecross {name} ...{target}`, `Delete label in the repository(ies) or local storage.`],
		[`label list {target}`, `List all of the labels in the repository or local storage.`],
		[`label pullmerge {target} ...{source}`, `Pull merge all of the labels from the source repository(ies) or local storage, to the target repository or local storage.`],
		[`label pushmerge {source} ...{target}`, `Push merge all of the labels from the source repository or local storage, to the target repository(ies) or local storage.`],
		[`label replace {source} ...{target}`, `Replace all of the labels from the source repository or local storage, to the target repository(ies) or local storage.`],
		[`label reset ...{target}`, `Reset to default labels in the repository(ies) or local storage.`]
	],
	localstorage = [
		[`localstorage lock {key}`, `Protect the GitHub account's personal access token and secret(s) with new key. Key should not be the GitHub account's password, and must be at least 8 charactars (case-sensitive).`],
		[`localstorage unlock {key}`, `Unprotect the GitHub account's personal access token and secret(s) with key that previously setted (case-sensitive).`]
	],
	secret = [
		[`secret add {target} {key} {value}`, `Add a secret in the repository, local storage, or organization.`],
		[`secret delete {target} ...{key}`, `Delete secret(s) in the repository, local storage, or organization.`],
		[`secret deleteall ...{target}`, `Delete all of the secrets in the repository(ies), local storage, or organization(s).`],
		[`secret deletecross {key} ...{target}`, `Delete secret in the repository(ies), local storage, or organization(s).`],
		[`secret list {target}`, `List all of the secrets in the repository, local storage, or organization.`],
		[`secret lock {key}`, `Protect the secret(s) with new key. Key must be at least 8 charactars (case-sensitive).`],
		[`secret pushmerge ...{target}`, `Push merge all of the secrets from the local storage to the repository(ies) or organization(s).`],
		[`secret replace ...{target}`, `Replace all of the secrets from the local storage to the repository(ies) or organization(s).`],
		[`secret unlock {key}`, `Unprotect the secret(s) with key that previously setted (case-sensitive).`]
	];
module.exports = {
	account,
	help,
	label,
	localstorage,
	secret
};
