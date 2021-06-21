const chalk = require("chalk"),
	languageService = require("../language/main.js");
/**
 * @private
 * @function error
 * @param {string} text
 * @returns {void}
 */
function error(text) {
	console.error(`${chalk.red.bold(`${languageService.consoleError}`)}\t${text}`);
};
/**
 * @private
 * @function information
 * @param {string} text
 * @returns {void}
 */
function information(text) {
	console.log(`${chalk.blue.bold(`${languageService.consoleInformation}`)}\t${text}`);
};
/**
 * @private
 * @function warning
 * @param {string} text
 * @returns {void}
 */
function warning(text) {
	console.warn(`${chalk.yellow.bold(`${languageService.consoleWarning}`)}\t${text}`);
};
module.exports = {
	error,
	information,
	warning
};
