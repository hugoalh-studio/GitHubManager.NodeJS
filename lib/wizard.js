const enquirer = require("enquirer"),
	header = require("./internal/header.js");
async function wizard() {
	console.log(header);
	let mainMenu = new ({
		choices: [
			"👤 Account",
			"❓ Help",
			"🏷 Label",
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
		case "🔑 Secret":
			require("../lib/wizard/secret.js")();
			break;
		case "🚪 Exit":
			process.exit(0);
	};
};
module.exports = wizard;
