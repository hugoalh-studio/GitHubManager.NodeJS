const internalWizard = require("./internal/wizard.js"),
	languageService = require("./language/main.js");
const wizardData = {
	account: `👤 ${languageService.accountTitle}`,
	exit: `🚪 ${languageService.exitTitle}`,
	help: `❓ ${languageService.helpTitle}`,
	label: `🏷 ${languageService.labelTitle}`,
	localStorage: `🗄 ${languageService.localStorageTitle}`,
	migrate: `⏩ ${languageService.migrateTitle}`,
	secret: `🔑 ${languageService.secretTitle}`
}
async function wizard(commandLine) {
	let action = await internalWizard.singleSelectSearch([
		wizardData.account,
		wizardData.label,
		wizardData.localStorage,
		wizardData.secret,
		wizardData.migrate,
		wizardData.help,
		wizardData.exit
	]);
	switch (action) {
		case wizardData.account:
			return require("./wizard/account.js")(commandLine);
		case wizardData.label:
			return require("./wizard/label.js")(commandLine);
		case wizardData.localStorage:
			return require("./wizard/local-storage.js")(commandLine);
		case wizardData.secret:
			return require("./wizard/secret.js")(commandLine);
		case wizardData.migrate:
			return require("./wizard/migrate.js")(commandLine);
		case wizardData.help:
			return require("./action/help.js")(commandLine);
		case wizardData.exit:
		default:
			process.exit(0);
	};
};
module.exports = wizard;
