const internalWizard = require("../internal/wizard.js"),
	languageService = require("../language/main.js");
async function wizard(commandLine) {
	let action = await internalWizard.singleSelectSearch([
		`👤 ${languageService.accountTitle}`,
		`🏷 ${languageService.labelTitle}`,
		`🗄 ${languageService.localStorageTitle}`,
		`🔑 ${languageService.secretTitle}`,
		`⏩ ${languageService.migrateTitle}`,
		`❓ ${languageService.helpTitle}`,
		`🚪 ${languageService.exitTitle}`
	]);
	switch (action) {
		case `👤 ${languageService.accountTitle}`:
			return require("./wizard/account.js")(commandLine);
		case `🏷 ${languageService.labelTitle}`:
			return require("./wizard/label.js")(commandLine);
		case `🗄 ${languageService.localStorageTitle}`:
			return require("./wizard/local-storage.js")(commandLine);
		case `🔑 ${languageService.secretTitle}`:
			return require("./wizard/secret.js")(commandLine);
		case `⏩ ${languageService.migrateTitle}`:
			return require("./wizard/migrate.js")(commandLine);
		case `❓ ${languageService.helpTitle}`:
			return require("../action/help.js")(commandLine);
		case `🚪 ${languageService.exitTitle}`:
		default:
			process.exit(0);
	};
};
module.exports = wizard;
