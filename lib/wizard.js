const internalWizard = require("./internal/wizard.js"),
	languageService = require("./language/main.js");
const wizardButton = {
	back: `🔙 ${languageService.buttonBack}`
},
	wizardSelectionListAccount = {
		rateLimit: `⏲ ${languageService.accountRateLimitTitle}`,
		signIn: `🚪 ${languageService.accountSignInTitle}`,
		signOut: `💨 ${languageService.accountSignOutTitle}`,
		whoAmI: `🧐 ${languageService.accountWhoAmITitle}`
	},
	wizardSelectionListGeneral = {
		addAcross: "",
		addOne: "",
		deleteAcross: "",
		deleteAll: "",
		deleteOne: "",
		edit: "",
		list: "",
		pullMerge: "",
		pullReplace: "",
		pushMerge: "",
		pushReplace: "",
		reset: ""
	},
	wizardSelectionListMain = {
		account: `👤 ${languageService.accountTitle}`,
		exit: `🚪 ${languageService.exitTitle}`,
		help: `❓ ${languageService.helpTitle}`,
		label: `🏷 ${languageService.labelTitle}`,
		localStorage: `🗄 ${languageService.localStorageTitle}`,
		migrate: `⏩ ${languageService.migrateTitle}`,
		secret: `🔑 ${languageService.secretTitle}`
	};
async function wizardAccount(commandLine) {
	let action = await internalWizard.singleSelectSearch([
		wizardSelectionListAccount.signIn,
		wizardSelectionListAccount.whoAmI,
		wizardSelectionListAccount.rateLimit,
		wizardSelectionListAccount.signOut,
		wizardButton.back
	]);
	switch (action) {
		case wizardSelectionListAccount.signIn:

		case wizardSelectionListAccount.whoAmI:

		case wizardSelectionListAccount.rateLimit:

		case wizardSelectionListAccount.signOut:

		case wizardButton.back:
		default:
			return wizardMain(commandLine);
	};
};
async function wizardMain(commandLine) {
	let action = await internalWizard.singleSelectSearch([
		wizardSelectionListMain.account,
		wizardSelectionListMain.label,
		wizardSelectionListMain.localStorage,
		wizardSelectionListMain.secret,
		wizardSelectionListMain.migrate,
		wizardSelectionListMain.help,
		wizardSelectionListMain.exit
	]);
	switch (action) {
		case wizardSelectionListMain.account:
			return wizardAccount(commandLine);
		case wizardSelectionListMain.label:
			return wizardLabel(commandLine);
		case wizardSelectionListMain.localStorage:
			return wizardLocalStorage(commandLine);
		case wizardSelectionListMain.secret:
			return wizardSecret(commandLine);
		case wizardSelectionListMain.migrate:
			return wizardMigrate(commandLine);
		case wizardSelectionListMain.help:
			return wizardHelp(commandLine);
		case wizardSelectionListMain.exit:
		default:
			process.exit(0);
	};
};
module.exports = wizardMain;
