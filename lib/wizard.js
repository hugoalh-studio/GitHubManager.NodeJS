/*==================
[NodeJS] GitHub Manager - Wizard Mode
	Language:
		NodeJS/14.15.0
==================*/
const chalk = require("chalk"),
	enquirerSelect = require("enquirer").Select,
	header = require("./header.js");
console.log(header);
let mainMenu = new enquirerSelect({
	name: "submodule",
	message: "Select a service",
	choices: [
		"account",
		"help",
		"label",
		"localstorage",
		"secret"
	]
});
(async () => {
	let response = await mainMenu.run();
	console.log(response);
})();
