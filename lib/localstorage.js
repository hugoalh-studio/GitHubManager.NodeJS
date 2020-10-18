/*==================
[NodeJS] GitHub Manager - Local Storage
	Language:
		NodeJS/10.0.0
==================*/
const chalk = require("chalk"),
	fileSystem = require("fs"),
	path = require("path");
const pathAppData = path.join(process.env.APPDATA, "hugoalh Studio", "GitHub Manager"),
	fileAccount = "account.passport",
	fileLabel = "label.json",
	labelDefault = require("./label_default.js");
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
			console.error(`${chalk.bgRed.white.bold("ERROR")} Application error! Please report to author. ([NodeJS] GitHub Manager (LS-R-${type.toUpperCase()}))`);
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
		console.error(`${chalk.bgRed.white.bold("ERROR")} System denied to access application storage file ${fileName}! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
	return data;
};
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
			console.error(`${chalk.bgRed.white.bold("ERROR")} Application error! Please report to author. ([NodeJS] GitHub Manager (LS-W-${type.toUpperCase()}))`);
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
		console.error(`${chalk.bgRed.white.bold("ERROR")} System denied to access application storage file ${fileName}! ([NodeJS] GitHub Manager)`);
		process.exit(0);
	};
};
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
		console.error(`${chalk.bgRed.white.bold("ERROR")} System denied to access application storage directory! ([NodeJS] GitHub Manager)`);
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
	write("label", JSON.stringify(labelDefault));
};
module.exports = {
	read,
	write
};
