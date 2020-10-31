/*==================
[NodeJS] GitHub Manager - Secret - Locker
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk"),
	localStorage = require("../localstorage/internal.js"),
	scrypto = require("../scrypto.js");
function lock(password = "") {
	if (password.length < 8) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "password" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let data = localStorage.read("secret", true);
	let dataSplit = data.replace(/\r\n/gu, "\n").replace(/\n\n+/gu, "\n").split("\n");
	let result = [];
	dataSplit.forEach((line) => {
		result.push(scrypto.encrypt(line, password));
	});
	localStorage.write("secret", result.join("\n"), true);
};
function unlock(password = "") {
	if (password.length < 8) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "password" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	let data = localStorage.read("secret", true);
	let dataSplit = data.replace(/\r\n/gu, "\n").replace(/\n\n+/gu, "\n").split("\n");
	let result = [];
	dataSplit.forEach((line) => {
		result.push(scrypto.decrypt(line, password));
	});
	localStorage.write("secret", result.join("\n"), true);
};
module.exports = {
	lock,
	unlock
};
