/*==================
[NodeJS] GitHub Manager - Local Storage
	Language:
		NodeJS/10.13.0
==================*/
const chalk = require("chalk");
module.exports = function localstorage(input) {
	let method = input.line[1] || "";
	switch (method.toLowerCase()) {
		case "lock":
			require("./account/locker.js").lock(input.line[2]);
			require("./secret/locker.js").lock(input.line[2]);
			break;
		case "unlock":
			require("./account/locker.js").unlock(input.line[2]);
			require("./secret/locker.js").unlock(input.line[2]);
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list. ([NodeJS] GitHub Manager)`);
			break;
	};
};
