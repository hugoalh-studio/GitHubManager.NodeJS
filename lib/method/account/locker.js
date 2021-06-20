const internalConsole = require("../../internal/console.js"),
	localStorage = require("../../internal/storage.js"),
	symmetricCrypto = require("@hugoalh/symmetric-crypto");
function accountLock(passpharse = "") {
	if (passpharse.length < 8) {
		internalConsole.error(`Argument "passpharse" must be type of string (non-nullable) and at least 8 characters!`);
		process.exit(0);
	};
	let data = localStorage.read("account", true);
	let result = symmetricCrypto.encrypt(data, passpharse);
	localStorage.write("account", result, true);
};
function accountUnlock(passpharse = "") {
	if (passpharse.length < 8) {
		internalConsole.error(`Argument "passpharse" must be type of string (non-nullable) and at least 8 characters!`);
		process.exit(0);
	};
	let data = localStorage.read("account", true);
	let result = symmetricCrypto.decrypt(data, passpharse);
	localStorage.write("account", result, true);
};
module.exports = {
	lock: accountLock,
	unlock: accountUnlock
};
