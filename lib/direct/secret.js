const chalk = require("chalk");
function secret(commandLine) {
	let method = commandLine.action[1] || "",
		remain = commandLine.action.splice(2);
	switch (method.toLowerCase()) {
		case "add":
		case "create":
			return require("./secret/add.js")(...remain);
		case "delete":
		case "del":
		case "remove":
		case "rm":
			return require("./secret/delete.js")(...remain);
		case "deleteall":
		case "delall":
		case "removeall":
		case "rmall":
			return require("./secret/deleteall.js")(...remain);
		case "deletecross":
		case "delcr":
		case "delcross":
		case "deletecr":
		case "removecr":
		case "removecross":
		case "rmcr":
		case "rmcross":
			return require("./secret/deletecross.js")(...remain);
		case "list":
			return require("./secret/list.js")(remain[0], false);
		case "lock":
			return require("./secret/locker.js").lock(remain[0]);
		case "pushmerge":
		case "push":
			return require("./secret/pushmerge.js")(...remain);
		case "replace":
			return require("./secret/replace.js")(...remain);
		case "unlock":
			return require("./secret/locker.js").unlock(remain[0]);
		default:
			console.error(`${chalk.bgRed.white.bold("ERROR")} Unknown command! Use \`help\` to view the command list.`);
			break;
	};
};
module.exports = secret;
