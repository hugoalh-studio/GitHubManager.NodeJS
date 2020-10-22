/*==================
[NodeJS] GitHub Manager - Account - Locker
	Language:
		NodeJS/10.0.0
	Reference:
		symencdec (https://github.com/nire0510/symencdec, https://www.npmjs.com/package/symencdec)
==================*/
const chalk = require("chalk"),
	crypto = require("crypto"),
	localStorage = require("../localstorage.js");
function passwordHash(password) {
	return crypto.createHash("sha256").update(password).digest();
};
function lock(password = "") {
	if (password.length < 8) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "password" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	}
	let data = localStorage.read("account");
	let iv = crypto.randomBytes(16),
		tone = 16 - (data.length % 16);
	let cipher = crypto.createCipheriv("AES-256-CBC", passwordHash(password).slice(0, 32), iv);
	let result = Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
	localStorage.write("account", result);
};
function unlock(password = "") {
	if (password.length < 8) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} Argument "password" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	}
	let data = localStorage.read("account");
	let encrypted = Buffer.from(data, "base64");
	let decipher = crypto.createDecipheriv("AES-256-CBC", passwordHash(password).slice(0, 32), encrypted.slice(0, 16));
	let decrypted = (Buffer.concat([decipher.update(encrypted.slice(16)), decipher.final()])).toString();
	let result = decrypted.substr(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
	localStorage.write("account", result);
};
module.exports = {
	lock,
	unlock
};
