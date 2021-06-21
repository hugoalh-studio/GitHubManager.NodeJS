const internalVersion = require("../internal/version.js");
const matrix = {
	applicationHeaderPadding: "                                                  ",
	applicationName: "GitHub Manager (NodeJS CLI Edition)"
};
const languageKey = {
	accountTitle: "Account",
	applicationHeader: `${matrix.applicationHeaderPadding}\n    ${matrix.applicationName} v${internalVersion.semantic}    \n${matrix.applicationHeaderPadding}`,
	applicationName: `${matrix.applicationName}`,
	backTitle: "Back",
	cacheTitle: "Cache",
	cancelTitle: "Cancel",
	confirmTitle: "Confirm",
	consoleError: "ERROR: ",
	consoleInformation: "INFO: ",
	consoleWarning: "WARN: ",
	directModeTitle: "Direct mode!",
	exitTitle: "Exit",
	helpTitle: "Help",
	labelTitle: "Label",
	localStorageTitle: "Storage",
	secretTitle: "Secret",
	wizardModeTitle: "Wizard mode!"
};
module.exports = languageKey;
