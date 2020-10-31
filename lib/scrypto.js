/*==================
[NodeJS] GitHub Manager - Scrypto
	Language:
		NodeJS/10.13.0
	Reference:
		symencdec (https://github.com/nire0510/symencdec, https://www.npmjs.com/package/symencdec)
==================*/
const crypto = require("crypto");
function passwordHash(password) {
	return crypto.createHash("sha256").update(password).digest();
};
function decrypt(data, password) {
	let encrypted = Buffer.from(data, "base64");
	let decipher = crypto.createDecipheriv("AES-256-CBC", passwordHash(password).slice(0, 32), encrypted.slice(0, 16));
	let decrypted = (Buffer.concat([decipher.update(encrypted.slice(16)), decipher.final()])).toString();
	return decrypted.substr(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
};
function encrypt(data, password) {
	let iv = crypto.randomBytes(16),
		tone = 16 - (data.length % 16);
	let cipher = crypto.createCipheriv("AES-256-CBC", passwordHash(password).slice(0, 32), iv);
	return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
};
module.exports = {
	decrypt,
	encrypt
};
