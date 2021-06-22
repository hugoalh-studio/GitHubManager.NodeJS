const internalWizard = require("../internal/wizard.js"),
	languageService = require("../language/main.js");
async function wizard() {
	let action = await internalWizard.singleSelectSearch([
		`👤 ${languageService.actionAccountTitle}`,
		`🏷 ${languageService.actionLabelTitle}`,
		`🗄 ${languageService.actionLocalStorageTitle}`,
		`🔑 ${languageService.actionSecretTitle}`,
		`⏩ ${languageService.actionMigrateTitle}`,
		`❓ ${languageService.actionHelpTitle}`,
		`🚪 ${languageService.actionExitTitle}`
	]);
	switch (action) {
		case `👤 ${languageService.actionAccountTitle}`:
			require("./wizard/account.js")();
			break;
		case `🏷 ${languageService.actionLabelTitle}`:
			require("./wizard/label.js")();
			break;
		case `🗄 ${languageService.actionLocalStorageTitle}`:
			require("./wizard/local-storage.js")();
			break;
		case `🔑 ${languageService.actionSecretTitle}`:
			require("./wizard/secret.js")();
			break;
		case `⏩ ${languageService.actionMigrateTitle}`:
			break;
		case `❓ ${languageService.actionHelpTitle}`:
			require("../action/help.js")();
			break;
		case `🚪 ${languageService.actionExitTitle}`:
			process.exit(0);
	};
};
module.exports = wizard;
