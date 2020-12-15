/*==================
[NodeJS] GitHub Manager - Secret - Locker
	Language:
		NodeJS/14.15.0
==================*/
const chalk = require("chalk"),
	localStorage = require("../localstorage/internal.js"),
	symmetricCrypto = require("@hugoalh/symmetric-crypto");
function secretLock(key = "") {
	if (key.length < 8) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "key" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let data = localStorage.read("secret", true);
	let result = symmetricCrypto.encryptMultipleLine(data, key);
	localStorage.write("secret", result, true);
};
function secretUnlock(key = "") {
	if (key.length < 8) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "key" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let data = localStorage.read("secret", true);
	let result = symmetricCrypto.decryptMultipleLine(data, key);
	localStorage.write("secret", result, true);
};
module.exports = {
	lock: secretLock,
	unlock: secretUnlock
};
