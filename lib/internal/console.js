const chalk = require("chalk"),
	languageService = require("../language/main.js");
/**
 * @private
 * @function error
 * @param {string} text
 * @param {object} [placeholder={}]
 * @returns {void}
 */
function error(text, placeholder = {}) {
	Object.keys(placeholder).forEach((element) => {
		text = text.replace(`%${element}%`, placeholder[element]);
	});
	console.error(`${chalk.red.bold(`${languageService.consoleError}`)}\t${text}`);
};
/**
 * @private
 * @function information
 * @param {string} text
 * @param {object} [placeholder={}]
 * @returns {void}
 */
function information(text, placeholder = {}) {
	Object.keys(placeholder).forEach((element) => {
		text = text.replace(`%${element}%`, placeholder[element]);
	});
	console.log(`${chalk.blue.bold(`${languageService.consoleInformation}`)}\t${text}`);
};
/**
 * @private
 * @function warning
 * @param {string} text
 * @param {object} [placeholder={}]
 * @returns {void}
 */
function warning(text, placeholder = {}) {
	Object.keys(placeholder).forEach((element) => {
		text = text.replace(`%${element}%`, placeholder[element]);
	});
	console.warn(`${chalk.yellow.bold(`${languageService.consoleWarning}`)}\t${text}`);
};
module.exports = {
	error,
	information,
	warning
};
