/*==================
[NodeJS] GitHub Manager - Account
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk");
module.exports = function main(input) {
	let method = input[0] || "";
	switch (method.toLowerCase()) {
		case "limit":
			return require("./account/limit.js")();
		case "lock":
			return require("./account/locker.js").lock(input[1]);
		case "signin":
		case "login":
			return require("./account/signin.js")(input[1]);
		case "signout":
		case "logout":
			const localStorage = require("./localstorage/internal.js");
			return localStorage.write("account", "");
		case "unlock":
			return require("./account/locker.js").unlock(input[1]);
		case "whoami":
		case "who":
			return require("./account/whoami.js")();
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list. ([NodeJS] GitHub Manager)`);
			break;
	};
};
