const userLanguage = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LC_NAME;
let ghmLanguage;
if (userLanguage.search(/^zh/giu) === 0) {
	ghmLanguage = Object.assign({}, require("./en.js"), require("./zh.js"));
} else {
	ghmLanguage = require("./en.js");
};
module.exports = ghmLanguage;
