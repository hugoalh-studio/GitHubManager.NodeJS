/*==================
[NodeJS] GitHub Manager - Account - Locker
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk"),
	localStorage = require("../localstorage/internal.js"),
	symmetricCrypto = require("@hugoalh/symmetric-crypto");
function accountLock(key = "") {
	if (key.length < 8) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "key" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let data = localStorage.read("account", true);
	let result = symmetricCrypto.encrypt(data, key);
	localStorage.write("account", result, true);
};
function accountUnlock(key = "") {
	if (key.length < 8) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "key" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let data = localStorage.read("account", true);
	let result = symmetricCrypto.decrypt(data, key);
	localStorage.write("account", result, true);
};
module.exports = {
	lock: accountLock,
	unlock: accountUnlock
};
