const chalk = require("chalk");
/**
 * @private
 * @function error
 * @param {string} text
 * @returns {void}
 */
function error(text) {
	console.error(`${chalk.bgRed.white.bold("ERROR")} ${text}`);
};
/**
 * @private
 * @function information
 * @param {string} text
 * @returns {void}
 */
function information(text) {
	console.log(`${chalk.bgBlue.white.bold("INFO")} ${text}`);
};
/**
 * @private
 * @function warning
 * @param {string} text
 * @returns {void}
 */
function warning(text) {
	console.warn(`${chalk.bgYellow.black.bold("WARN")} ${text}`);
};
module.exports = {
	error,
	information,
	warning
};
