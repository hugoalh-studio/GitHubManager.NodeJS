/*==================
[NodeJS] GitHub Manager - Account
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk");
module.exports = function main(input) {
	let method = input[0] || "";
	switch (method.toLowerCase()) {
		case "limit":
			return require("./account/limit.js")();
		case "signin":
		case "login":
			return require("./account/signin.js")(input[1]);
		case "signout":
		case "logout":
			const localStorage = require("./localstorage.js");
			return localStorage.write("account", "");
		case "whoami":
		case "who":
			return require("./account/whoami.js")();
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! ([NodeJS] GitHub Manager)`);
			return require("./help.js")();
	};
};
