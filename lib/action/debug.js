const path = require("path");
function actionDebug(commandLine) {
	console.log(`Node Config:\n${JSON.stringify(process.config)}\n`);
	console.log(`Node Version:\n${JSON.stringify(process.versions)}\n`);
	console.log(`Node Argument:\n${JSON.stringify(process.execArgv)}\n`);
	console.log(`Node RAM:\n${JSON.stringify(process.memoryUsage())}\n`);
	console.log(`Node PID:\n${process.pid}\n`);
	console.log(`Node ${JSON.stringify(process.platform)}\n`);
	console.log(`Node PPID:\n${process.ppid}\n`);
	console.log(`Node Usage:\n${JSON.stringify(process.resourceUsage())}\n`);
	console.log(`Current Working Directory:\n${process.cwd()}\n`);
	console.log(`Root:\n${path.join(__dirname, "../../")}\n`);
	console.log(`Version:\n${JSON.stringify(require("../internal/version.js"))}\n`);
	console.log(`Command Line Vanilla:\n${JSON.stringify(process.argv)}\n`);
	console.log(`Command Line Parse:\n${JSON.stringify(commandLine)}`);
};
module.exports = actionDebug;
