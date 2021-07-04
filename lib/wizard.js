// $<Note>$ Wizard service must be in one file, or otherwise cause require stack error!
const ghmConsole = require("./internal/console.js"),
	ghmLanguage = require("./language/main.js"),
	ghmWizardQuestion = require("./internal/wizard-question.js");
function wizardWelcome(commandLine) {
	console.log(ghmLanguage.wizardWelcome);
	ghmConsole.information(ghmLanguage.wizardLoading);
	return wizardMain(commandLine);
};
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
	debug: `🎯 ${ghmLanguage.debugTitle}`,
	buttonBack: `🔙 ${ghmLanguage.buttonBack}`,
	exit: `🚪 ${ghmLanguage.exitTitle}`,
	help: `❓ ${ghmLanguage.helpTitle}`,
	label: `🏷 ${ghmLanguage.labelTitle}`,
	localStorage: `🗄 ${ghmLanguage.localStorageTitle}`,
	migrate: `⏩ ${ghmLanguage.migrateTitle}`,
	secret: `🔑 ${ghmLanguage.secretTitle}`
};
async function wizardAccountRateLimit(commandLine) {

};
async function wizardAccountSignIn(commandLine) {

};
async function wizardAccountSignOut(commandLine) {

};
async function wizardAccountWhoAmI(commandLine) {

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
			return wizardAccountSignIn(commandLine);
		case ghmWizardButton.accountWhoAmI:
			return wizardAccountWhoAmI(commandLine);
		case ghmWizardButton.accountRateLimit:
			return wizardAccountRateLimit(commandLine);
		case ghmWizardButton.accountSignOut:
			return wizardAccountSignOut(commandLine);
		case ghmWizardButton.buttonBack:
		default:
			return wizardMain(commandLine);
	};
};
function wizardDebug(commandLine) {
	require("./action/debug.js")(commandLine);
	return wizardMain(commandLine);
};
async function wizardHelp(commandLine) {

};
async function wizardLabel(commandLine) {

};
async function wizardLocalStorage(commandLine) {

};
async function wizardMigrate(commandLine) {

};
async function wizardSecret(commandLine) {

};
async function wizardMain(commandLine) {
	let action = await ghmWizardQuestion.singleSelectSearch([
		ghmWizardButton.account,
		ghmWizardButton.label,
		ghmWizardButton.localStorage,
		ghmWizardButton.secret,
		ghmWizardButton.migrate,
		ghmWizardButton.help,
		ghmWizardButton.debug,
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
		case ghmWizardButton.debug:
			return wizardDebug(commandLine);
		case ghmWizardButton.exit:
		default:
			process.exit(0);
	};
};
module.exports = wizardWelcome;
