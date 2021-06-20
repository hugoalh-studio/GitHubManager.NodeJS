const chalk = require("chalk");
/**
 * @private
 * @function error
 * @param {string} text
 * @returns {void}
 */
function error(text) {
	console.error(`${chalk.red.bold("ERROR:")}\t${text}`);
};
/**
 * @private
 * @function information
 * @param {string} text
 * @returns {void}
 */
function information(text) {
	console.log(`${chalk.blue.bold("INFO:")}\t${text}`);
};
/**
 * @private
 * @function warning
 * @param {string} text
 * @returns {void}
 */
function warning(text) {
	console.warn(`${chalk.yellow.bold("WARN:")}\t${text}`);
};
module.exports = {
	error,
	information,
	warning
};
