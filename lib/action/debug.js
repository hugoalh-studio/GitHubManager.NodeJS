const path = require("path");
function actionDebug(commandLine) {
	console.log(`
Application Current Working Directory:
${process.cwd()}

Application Root & Version:
${path.join(__dirname, "../../")}
${JSON.stringify(require("../internal/version.js"))}

Command Line Vanilla:
${JSON.stringify(process.argv)}

Command Line Parse:
${JSON.stringify(commandLine)}

NodeJS Argument:
${JSON.stringify(process.execArgv)}

NodeJS Config:
${JSON.stringify(process.config)}

NodeJS Process ID (P/PP):
${process.pid}/${process.ppid}

NodeJS Service Version:
${JSON.stringify(process.versions)}

Platform, Resource & Memory Usage:
${process.platform}
${JSON.stringify(process.resourceUsage())}
${JSON.stringify(process.memoryUsage())}
`);
};
module.exports = actionDebug;
