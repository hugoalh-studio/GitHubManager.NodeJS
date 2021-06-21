const chalk = require("chalk"),
	languageService = require("../language/main.js");
const header = `${chalk.bgGray.white.bold(languageService.applicationHeader)}`;
module.exports = header;
