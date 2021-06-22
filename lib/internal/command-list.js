const account = [
		[`account limit`, `Get the API rate limit status of this GitHub account.`],
		[`account sign-in {token}`, `Sign in a GitHub account via personal access token.`],
		[`account sign-out`, `Sign out this GitHub account.`],
		[`account who-am-i`, `Get the username of this GitHub account.`]
	],
	help = [
		[`help`, `Display this information.`]
	],
	label = [
		[`label add {target} {name} {color} [description]`, `Add a label in the repository or local storage.`],
		[`label delete {target} ...{name}`, `Delete label(s) in the repository or local storage.`],
		[`label delete-all ...{target}`, `Delete all of the labels in the repository(ies) or local storage.`],
		[`label delete-cross {name} ...{target}`, `Delete label in the repository(ies) or local storage.`],
		[`label list {target}`, `List all of the labels in the repository or local storage.`],
		[`label pull-merge {target} ...{source}`, `Pull merge all of the labels from the source repository(ies) or local storage, to the target repository or local storage.`],
		[`label push-merge {source} ...{target}`, `Push merge all of the labels from the source repository or local storage, to the target repository(ies) or local storage.`],
		[`label push-replace {source} ...{target}`, `Replace all of the labels from the source repository or local storage, to the target repository(ies) or local storage.`],
		[`label reset ...{target}`, `Reset to default labels in the repository(ies) or local storage.`]
	],
	localstorage = [
		[`localstorage lock {passpharse}`, `Protect the GitHub account's personal access token and secret(s) with an additional passpharse; Passpharse should not be the GitHub account's password, and must be at least 8 characters (case-sensitive).`],
		[`localstorage unlock {passpharse}`, `Unprotect the GitHub account's personal access token and secret(s) with passpharse that previously setted (case-sensitive).`]
	],
	secret = [
		[`secret add {target} {key} {value}`, `Add a secret in the repository, local storage, or organization.`],
		[`secret delete {target} ...{key}`, `Delete secret(s) in the repository, local storage, or organization.`],
		[`secret delete-all ...{target}`, `Delete all of the secrets in the repository(ies), local storage, or organization(s).`],
		[`secret delete-cross {key} ...{target}`, `Delete secret in the repository(ies), local storage, or organization(s).`],
		[`secret list {target}`, `List all of the secrets in the repository, local storage, or organization.`],
		[`secret push-merge ...{target}`, `Push merge all of the secrets from the local storage to the repository(ies) or organization(s).`],
		[`secret push-replace ...{target}`, `Replace all of the secrets from the local storage to the repository(ies) or organization(s).`]
	];
module.exports = {
	account,
	help,
	label,
	localstorage,
	secret
};
