const internalConsole = require("../../internal/console.js");
function directAccount(input) {
	let method = input.action[1] || "";
	switch (method.toLowerCase()) {
		case "limit":
			return require("../../action/account/rate-limit.js")();
		case "log-in":
		case "login":
		case "sign-in":
		case "signin":
			return require("../../action/account/sign-in.js")(input.action[2]);
		case "log-out":
		case "logout":
		case "sign-out":
		case "signout":
			const localStorage = require("../../internal/local-storage.js");
			return localStorage.write("account", "");
		case "who-am-i":
		case "who":
		case "whoami":
			return require("../../action/account/who-am-i.js")();
		default:
			internalConsole.error(`Unknown command "${method}"! Use \`help\` to view the command list.`);
			process.exit(0);
	};
};
module.exports = directAccount;
