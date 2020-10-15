/*==================
[NodeJS] GitHub Manager - Account - Who Am I
	Language:
		NodeJS/10.0.0
==================*/
const sign = require("./sign.js");
/**
 * @private
 * @function whoAmI
 * @returns {string}
 */
function whoAmI() {
	let data = mats.execute(
		require.resolve("../mats/account_whoami.js"),
		JSON.stringify({
			token: sign.pass()
		})
	);
	data = JSON.parse(data);
	return data.data.login;
};
module.exports = whoAmI;
