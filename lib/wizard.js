const cliArgumentParser = require("@hugoalh/cli-argument-parser"),
	enquirerSelect = require("enquirer").Select,
	header = require("./internal/header.js");
async function wizard() {
	console.log(header);
	let mainMenu = new enquirerSelect({
		choices: [
			"👤 Account",
			"❓ Help",
			"🏷 Label",
			"🗄 Local Storage",
			"🔑 Secret",
			"🚪 Exit"
		]
	});
	let response = await mainMenu.run();
	switch (response) {
		case "👤 Account":
			require("../lib/wizard/account.js")();
			break;
		case "❓ Help":
			require("../lib/method/help.js")(cliArgumentParser.parse());
			break;
		case "🏷 Label":
			require("../lib/wizard/label.js")();
			break;
		case "🗄 Local Storage":
			require("../lib/wizard/localstorage/service.js.js")();
			break;
		case "🔑 Secret":
			require("../lib/wizard/secret.js")();
			break;
		case "🚪 Exit":
			process.exit(0);
	};
};
module.exports = wizard;
