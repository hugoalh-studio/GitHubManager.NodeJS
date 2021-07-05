const fileSystem = require("fs"),
	ghmConsole = require("./console.js"),
	operatingSystem = require("os"),
	path = require("path");
const applicationDataPath = path.join(process.env.APPDATA, "GitHub Manager");
function localStorageRead(file) {
	try {
		return fileSystem.readFileSync(
			path.join(applicationDataPath, file),
			{
				encoding: "utf8",
				flag: "r"
			}
		).replace(/\r\n/giu, "\n").replace(/\r/giu, "\n");
	} catch (error) {
		ghmConsole.error("Operating system denied application read from application storage file \"%file%\"!", { file: file });
		process.exit(0);
	};
};
function localStorageReadBase64(file) {
	try {
		return Buffer.from(localStorageRead(file), "base64").toString("utf8").replace(/\r\n/giu, "\n").replace(/\r/giu, "\n");
	} catch (error) {
		ghmConsole.error("Operating system cannot decode application storage file \"%file%\"!", { file: file });
		process.exit(0);
	};
};
function localStorageWrite(file, data) {
	try {
		fileSystem.writeFileSync(
			path.join(applicationDataPath, file),
			data.replace(/\n/giu, operatingSystem.EOL),
			{
				encoding: "utf8",
				flag: "w"
			}
		);
	} catch (error) {
		ghmConsole.error("Operating system denied application write to application storage file \"%file%\"!", { file: file });
		process.exit(0);
	};
};
function localStorageWriteBase64(file, data) {
	try {
		data = Buffer.from(data, "utf8").toString("base64");
		return localStorageWrite(file, data);
	} catch (error) {
		ghmConsole.error("Operating system cannot encode application storage file \"%file%\"!", { file: file });
		process.exit(0);
	};
};

try {
	fileSystem.accessSync(applicationDataPath);
} catch (errorAccess) {
	try {
		fileSystem.mkdirSync(applicationDataPath, { recursive: true });
	} catch (errorMake) {
		ghmConsole.error("Operating system denied application to access application storage directory!");
		process.exit(0);
	};
};
module.exports = {
	read: localStorageRead,
	readBase64: localStorageReadBase64,
	write: localStorageWrite,
	writeBase64: localStorageWriteBase64
};
