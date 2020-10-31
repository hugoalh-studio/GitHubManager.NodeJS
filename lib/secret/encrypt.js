/*==================
[NodeJS] GitHub Manager - Secret - Encrypt
	Language:
		NodeJS/10.13.0
==================*/
const sodium = require("tweetsodium");
module.exports = function main(publicKey, value) {
	return Buffer.from(sodium.seal(Buffer.from(value), Buffer.from(publicKey, "base64"))).toString("base64");
};
