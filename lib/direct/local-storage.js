const internalConsole = require("../internal/console.js"),
	languageService = require("../language/main.js");
/**
 * @private
 * @function directLocalStorage
 * @param {object} commandLine
 * @returns
 */
function directLocalStorage(commandLine) {
	let method = commandLine.action[1] || "";
	if (method.search(/^(decrypt(ion)?|unlock)$/giu) === 0) {
		return require("../action/local-storage/decryption.js")(commandLine);
	};
	if (method.search(/^(encrypt(ion)?|lock)$/giu) === 0) {
		return require("../action/local-storage/encryption.js")(commandLine);
	};
	if (method.search(/^reset$/giu) === 0) {
		return require("../action/local-storage/reset.js")(commandLine);
	};
	internalConsole.error(languageService.errorUnknownCommand, { command: `local-storage ${method}` });
	process.exit(0);
};
module.exports = directLocalStorage;
