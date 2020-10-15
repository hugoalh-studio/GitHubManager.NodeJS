/*==================
[NodeJS] GitHub Manager - Local Storage
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk"),
	fileSystem = require("fs"),
	path = require("path");
const pathAppData = path.join(process.env.APPDATA, "@hugoalh-studio", "github-manager"),
	fileAccount = "account.passport",
	fileLabel = "label.json",
	labelDefault = require("./label_default.js");
try {
	fileSystem.accessSync(pathAppData);
} catch (errorAccess) {
	try {
		fileSystem.mkdirSync(
			pathAppData,
			{
				recursive: true
			}
		);
	} catch (errorMake) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} System denied to access application storage directory!`);
		process.exit(0);
	};
};
/**
 * @private
 * @function read
 * @param {string} [type=""]
 * @returns {string}
 */
function read(type = "") {
	let fileName;
	switch (type.toLowerCase()) {
		case "account":
			fileName = fileAccount;
			break;
		case "label":
			fileName = fileLabel;
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Application error (Code: LS-R-${type})! Please report to author.`);
			process.exit(0);
			break;
	};
	let data;
	try {
		data = fileSystem.readFileSync(
			path.join(pathAppData, fileName),
			{
				encoding: "utf8",
				flag: "r"
			}
		);
	} catch (error) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} System denied to access application storage file ${fileName}!`);
		process.exit(0);
	};
	return data;
};
/**
 * @private
 * @function write
 * @param {string} [type=""]
 * @param {string} [data=""]
 * @returns {void}
 */
function write(type = "", data = "") {
	let fileName;
	switch (type.toLowerCase()) {
		case "account":
			fileName = fileAccount;
			break;
		case "label":
			fileName = fileLabel;
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Application error (Code: LS-W-${type})! Please report to author.`);
			process.exit(0);
			break;
	};
	try {
		fileSystem.writeFileSync(
			path.join(pathAppData, fileName),
			data,
			{
				encoding: "utf8",
				flag: "w"
			}
		);
	} catch (error) {
		console.error(`${chalk.bgRed.white.bold("ERROR")} System denied to access application storage file ${fileName}!`);
		process.exit(0);
	};
};
try {
	fileSystem.accessSync(path.join(pathAppData, fileAccount));
} catch (error) {
	write("account", "");
};
try {
	fileSystem.accessSync(path.join(pathAppData, fileLabel));
} catch (error) {
	write(
		"label",
		JSON.stringify(labelDefault, undefined, "\t")
	);
};
module.exports = {
	read,
	write
};
