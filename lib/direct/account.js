const internalConsole = require("../internal/console.js");
function account(input) {
	let method = input.action[1] || "";
	switch (method.toLowerCase()) {
		case "limit":
			return require("../method/account/limit.js")();
		case "lock":
			return require("../method/account/locker.js").lock(input.action[2]);
		case "log-in":
		case "login":
		case "sign-in":
		case "signin":
			return require("../method/account/sign-in.js")(input.action[2]);
		case "log-out":
		case "logout":
		case "sign-out":
		case "signout":
			const localStorage = require("../internal/storage.js");
			return localStorage.write("account", "");
		case "unlock":
			return require("../method/account/locker.js").unlock(input.action[2]);
		case "who-am-i":
		case "who":
		case "whoami":
			return require("../method/account/who-am-i.js")();
		default:
			internalConsole.error(`Unknown command "${method}"! Use \`help\` to view the command list.`);
			process.exit(0);
	};
};
module.exports = account;
