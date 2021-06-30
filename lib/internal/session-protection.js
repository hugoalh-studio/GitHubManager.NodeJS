const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("./console.js"),
	sessionFlag = require("./session-flag.js");
/**
 * @private
 * @function sessionProtection
 * @param {*} item
 * @returns {void}
 */
function sessionProtection(item) {
	if (
		advancedDetermine.isJSON(item) !== true ||
		advancedDetermine.isArray(item.flag) !== true ||
		item.flag.includes(sessionFlag.panel) === false
	) {
		internalConsole.error("Invalid process entry!");
		process.exit(1);
	};
};
module.exports = sessionProtection;
