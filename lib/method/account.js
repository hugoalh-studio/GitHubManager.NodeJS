const chalk = require("chalk");
function account(input) {
	let method = input.line[1] || "";
	switch (method.toLowerCase()) {
		case "limit":
			return require("./account/limit.js")();
		case "lock":
			return require("./account/locker.js").lock(input.line[2]);
		case "signin":
		case "login":
			return require("./account/sign-in.js")(input.line[2]);
		case "signout":
		case "logout":
			const localStorage = require("./localstorage/internal.js");
			return localStorage.write("account", "");
		case "unlock":
			return require("./account/locker.js").unlock(input.line[2]);
		case "whoami":
		case "who":
			return require("./account/who-am-i.js")();
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list.`);
			break;
	};
};
module.exports = account;
