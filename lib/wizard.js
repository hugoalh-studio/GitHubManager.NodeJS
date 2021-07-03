// $<Note>$ Wizard service must be in one file, or otherwise cause require stack error!
const ghmLanguage = require("../language/main.js"),
	ghmWizardQuestion = require("./internal/wizard-question.js");
const ghmWizardButton = {
	account: `👤 ${ghmLanguage.accountTitle}`,
	accountRateLimit: `⏲ ${ghmLanguage.accountRateLimitTitle}`,
	accountSignIn: `🚪 ${ghmLanguage.accountSignInTitle}`,
	accountSignOut: `💨 ${ghmLanguage.accountSignOutTitle}`,
	accountWhoAmI: `🧐 ${ghmLanguage.accountWhoAmITitle}`,
	actionAddAcross: "",
	actionAddOne: "",
	actionDeleteAcross: "",
	actionDeleteAll: "",
	actionDeleteOne: "",
	actionEdit: "",
	actionList: "",
	actionPullMerge: "",
	actionPullReplace: "",
	actionPushMerge: "",
	actionPushReplace: "",
	actionReset: "",
	buttonBack: `🔙 ${ghmLanguage.buttonBack}`,
	exit: `🚪 ${ghmLanguage.exitTitle}`,
	help: `❓ ${ghmLanguage.helpTitle}`,
	label: `🏷 ${ghmLanguage.labelTitle}`,
	localStorage: `🗄 ${ghmLanguage.localStorageTitle}`,
	migrate: `⏩ ${ghmLanguage.migrateTitle}`,
	secret: `🔑 ${ghmLanguage.secretTitle}`
};
async function wizardAccount(commandLine) {
	let action = await ghmWizardQuestion.singleSelectSearch([
		ghmWizardButton.accountSignIn,
		ghmWizardButton.accountWhoAmI,
		ghmWizardButton.accountRateLimit,
		ghmWizardButton.accountSignOut,
		ghmWizardButton.buttonBack
	]);
	switch (action) {
		case ghmWizardButton.accountSignIn:

		case ghmWizardButton.accountWhoAmI:

		case ghmWizardButton.accountRateLimit:

		case ghmWizardButton.accountSignOut:

		case ghmWizardButton.buttonBack:
		default:
			return wizardMain(commandLine);
	};
};
async function wizardMain(commandLine) {
	let action = await ghmWizardQuestion.singleSelectSearch([
		ghmWizardButton.account,
		ghmWizardButton.label,
		ghmWizardButton.localStorage,
		ghmWizardButton.secret,
		ghmWizardButton.migrate,
		ghmWizardButton.help,
		ghmWizardButton.exit
	]);
	switch (action) {
		case ghmWizardButton.account:
			return wizardAccount(commandLine);
		case ghmWizardButton.label:
			return wizardLabel(commandLine);
		case ghmWizardButton.localStorage:
			return wizardLocalStorage(commandLine);
		case ghmWizardButton.secret:
			return wizardSecret(commandLine);
		case ghmWizardButton.migrate:
			return wizardMigrate(commandLine);
		case ghmWizardButton.help:
			return wizardHelp(commandLine);
		case ghmWizardButton.exit:
		default:
			process.exit(0);
	};
};
module.exports = wizardMain;
