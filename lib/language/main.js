const userLanguage = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LC_NAME;
let languageService;
if (userLanguage.search(/^zh/giu) === 0) {
	languageService = Object.assign({}, require("./en.js"), require("./zh.js"));
} else {
	languageService = require("./en.js");
};
module.exports = languageService;
