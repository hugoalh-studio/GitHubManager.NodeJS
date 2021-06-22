const fileSystem = require("fs"),
	internalConsole = require("./console.js"),
	path = require("path");
const pathAppData = path.join(process.env.APPDATA, "GitHub Manager"),
	fileNameAccount = "account.passport",
	fileNameLabel = "label.tsv",
	fileNameSecret = "secret.tsv";
function localstorageRead(type, ignoreCheck = false) {
	let fileName;
	switch (type.toLowerCase()) {
		case "account":
			fileName = fileNameAccount;
			break;
		case "label":
			fileName = fileNameLabel;
			break;
		case "secret":
			fileName = fileNameSecret;
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Application error! Please report to author.`);
			process.exit(0);
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
	if (type === "account" || ignoreCheck === true) {
		return data;
	};
	let dataSplit = data.replace(/\r\n/gu, "\n").replace(/\n\n+/gu, "\n").split("\n"),
		result = {};
	let dataHeader = dataSplit[0].split("\t"),
		dataLines = dataSplit.slice(1).sort();
	if (type === "label") {
		if (dataHeader.length !== 3 || dataHeader[0] !== "name" || dataHeader[1] !== "color" || dataHeader[2] !== "description") {
			console.error(`${chalk.bgRed.white.bold("ERROR")} Storage file ${fileName} have invalid pattern, or data corrupted!`);
			process.exit(0);
		};
		for (let index = 0; index < dataLines.length; index++) {
			let line = dataLines[index].split("\t");
			if (line.length !== 3) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Storage file ${fileName} have invalid pattern, or data corrupted!`);
				process.exit(0);
			};
			result[line[0]] = {
				"color": line[1],
				"description": line[2]
			};
		};
	} else if (type === "secret") {
		if (dataHeader.length !== 2 || dataHeader[0] !== "key" || dataHeader[1] !== "value") {
			console.error(`${chalk.bgRed.white.bold("ERROR")} Storage file ${fileName} have invalid pattern, or data corrupted!`);
			process.exit(0);
		};
		for (let index = 0; index < dataLines.length; index++) {
			let line = dataLines[index].split("\t");
			if (line.length !== 2) {
				console.error(`${chalk.bgRed.white.bold("ERROR")} Storage file ${fileName} have invalid pattern, or data corrupted!`);
				process.exit(0);
			};
			result[line[0]] = line[1];
		};
	};
	return result;
};
function localstorageWrite(type, data, ignoreCheck = false) {
	let fileName;
	switch (type.toLowerCase()) {
		case "account":
			fileName = fileNameAccount;
			break;
		case "label":
			fileName = fileNameLabel;
			break;
		case "secret":
			fileName = fileNameSecret;
			break;
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Application error! Please report to author.`);
			process.exit(0);
	};
	if (type === "label" && ignoreCheck === false) {
		let dataKey = Object.keys(data).sort(),
			result = "name\tcolor\tdescription";
		dataKey.forEach((key) => {
			let name = key,
				color = data[key]["color"],
				description = data[key]["description"];
			result += `\n${name}\t${color}\t${description}`;
		});
		data = result;
	} else if (type === "secret" && ignoreCheck === false) {
		let dataKey = Object.keys(data),
			result = "key\tvalue";
		dataKey.forEach((key) => {
			result += `\n${key}\t${data[key]}`;
		});
		data = result;
	};
	const operatingSystem = require("os");
	try {
		fileSystem.writeFileSync(
			path.join(pathAppData, fileName),
			data.replace(/\n/gu, operatingSystem.EOL),
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
try {
	fileSystem.accessSync(path.join(pathAppData, fileNameAccount));
} catch (error) {
	localstorageWrite("account", "");
};
try {
	fileSystem.accessSync(path.join(pathAppData, fileNameLabel));
} catch (error) {
	const labelDefault = require("./label-default.js");
	localstorageWrite("label", labelDefault);
};
try {
	fileSystem.accessSync(path.join(pathAppData, fileNameSecret));
} catch (error) {
	localstorageWrite("secret", {});
};
module.exports = {
	read: localstorageRead,
	write: localstorageWrite
};
