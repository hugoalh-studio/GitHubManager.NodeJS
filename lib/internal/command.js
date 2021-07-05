const ghmLanguage = require("../language/main.js");
const ghmCommand = {
	account: {
		command: "account",
		description: "",
		regularExpression: /^acc(ount)?$/giu
	},
	accountRateLimit: {
		command: "account rate-limit",
		description: "Get the API rate limit status of this GitHub account.",
		regularExpression: /^(rate-?)?limit$/giu
	},
	accountSignIn: {
		command: "account sign-in {token}",
		description: "Sign in a GitHub account via personal access token.",
		regularExpression: /^$/giu
	},
	accountSignOut: {
		command: "account sign-out",
		description: "Sign out this GitHub account.",
		regularExpression: /^$/giu
	},
	accountWhoAmI: {
		command: "account who-am-i",
		description: "Get the username of this GitHub account.",
		regularExpression: /^$/giu
	},
	help: {
		command: "help",
		description: "Display this information.",
		regularExpression: /^$/giu
	},
	labelAddAcross: {
	},
	labelAddOne: {
		command: "label add-one {target} {name} {color} [description]",
		description: "Add a label in the repository or local storage."
	},
	labelDeleteAcross: {
		command: "label delete-across {name} ...{target}",
		description: "Delete label in the repository(ies) or local storage."
	},
	labelDeleteAll: {
		command: "label delete-all ...{target}",
		description: "Delete all of the labels in the repository(ies) or local storage."
	},
	labelDeleteOne: {
		command: "label delete-one {target} ...{name}",
		description: "Delete label(s) in the repository or local storage."
	},
	labelList: {
		command: "label list {target}",
		description: "List all of the labels in the repository or local storage."
	},
	labelPullMerge: {
		command: "label pull-merge {target} ...{source}",
		description: "Pull merge all of the labels from the source repository(ies) or local storage, to the target repository or local storage."
	},
	labelPullReplace: {
		command: "label pull-replace {target} ...{source}",
		description: "Replace all of the labels from the source repository(ies) or local storage, to the target repository or local storage."
	},
	labelPushMerge: {
		command: "label push-merge {source} ...{target}",
		description: "Push merge all of the labels from the source repository or local storage, to the target repository(ies) or local storage."
	},
	labelPushReplace: {
		command: "label push-replace {source} ...{target}",
		description: "Replace all of the labels from the source repository or local storage, to the target repository(ies) or local storage."
	},
	labelReset: {
		command: "label reset ...{target}",
		description: "Reset to default labels in the repository(ies) or local storage."
	},
	localStorageDecrypt: {
		command: "localstorage decrypt {passpharse}",
		description: "Unprotect the GitHub account's personal access token and secret(s) with passpharse that previously setted (case-sensitive)."
	},
	localStorageEncrypt: {
		command: "localstorage encrypt {passpharse}",
		description: "Protect the GitHub account's personal access token and secret(s) with an additional passpharse; Passpharse should not be the GitHub account's password, and must be at least 8 characters (case-sensitive)."
	},
	secretAddAcross: {
	},
	secretAddOne: {
		command: "secret add-one {target} {key} {value}",
		description: "Add a secret in the repository, local storage, or organization."
	},
	secretDeleteAcross: {
		command: "secret delete-across {key} ...{target}",
		description: "Delete secret in the repository(ies), local storage, or organization(s)."
	},
	secretDeleteAll: {
		command: "secret delete-all ...{target}",
		description: "Delete all of the secrets in the repository(ies), local storage, or organization(s)."
	},
	secretDeleteOne: {
		command: "secret delete-one {target} ...{key}",
		description: "Delete secret(s) in the repository, local storage, or organization."
	},
	secretList: {
		command: "secret list {target}",
		description: "List all of the secrets in the repository, local storage, or organization."
	},
	secretPushMerge: {
		command: "secret push-merge ...{target}",
		description: "Push merge all of the secrets from the local storage to the repository(ies) or organization(s)."
	},
	secretPushReplace: {
		command: "secret push-replace ...{target}",
		description: "Replace all of the secrets from the local storage to the repository(ies) or organization(s)."
	}
};
module.exports = ghmCommand;
