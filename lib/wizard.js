/*==================
[NodeJS] GitHub Manager - Wizard Mode
	Language:
		NodeJS/14.15.0
==================*/
const enquirerSelect = require("enquirer").Select,
	header = require("./header.js");
async function wizard() {
	console.log(header);
	let mainMenu = new enquirerSelect({
		choices: [
			"account",
			"help",
			"label",
			"localstorage",
			"secret",
			"(exit)"
		]
	});
	let response = await mainMenu.run();
	switch (response) {
		case "account":
			require("../lib/wizard/account.js")();
			break;
		case "help":
			require("../lib/wizard/help.js")();
			break;
		case "label":
			require("../lib/wizard/label.js")();
			break;
		case "localstorage":
			require("../lib/wizard/localstorage/service.js.js")();
			break;
		case "secret":
			require("../lib/wizard/secret.js")();
			break;
		case "(exit)":
			process.exit(0);
	};
};
module.exports = wizard;
