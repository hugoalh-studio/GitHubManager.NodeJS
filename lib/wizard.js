const header = require("./internal/header.js"),
	internalConsole = require("../lib/internal/console.js"),
	internalWizard = require("./internal/wizard.js"),
	languageService = require("./language/main.js");
async function wizard() {
	console.log(header);
	internalConsole.information(languageService.wizardModeTitle);
	let action = await internalWizard.singleSelectSearch([
		`👤 ${languageService.accountTitle}`,
		`❓ ${languageService.helpTitle}`,
		`🏷 ${languageService.labelTitle}`,
		`🔑 ${languageService.secretTitle}`,
		`🚪 ${languageService.exitTitle}`
	]);
	switch (action) {
		case `👤 ${languageService.accountTitle}`:
			require("./wizard/account.js")();
			break;
		case `❓ ${languageService.helpTitle}`:
			require("./method/help.js")();
			break;
		case `🏷 ${languageService.labelTitle}`:
			require("./wizard/label.js")();
			break;
		case `🔑 ${languageService.secretTitle}`:
			require("./wizard/secret.js")();
			break;
		case `🚪 ${languageService.exitTitle}`:
			process.exit(0);
	};
};
module.exports = wizard;
