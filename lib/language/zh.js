const internalVersion = require("../internal/version.js");
const matrix = {
	applicationHeaderPadding: "                                             ",
	applicationName: "GitHub管家（NodeJS指令版本）"
};
const languageKey = {
	accountTitle: "帳戶",
	applicationHeader: `${matrix.applicationHeaderPadding}\n    ${matrix.applicationName}版本${internalVersion.semantic}    \n${matrix.applicationHeaderPadding}`,
	applicationName: `${matrix.applicationName}`,
	backTitle: "返回",
	cacheTitle: "快取",
	cancelTitle: "取消",
	confirmTitle: "確定",
	consoleError: "錯誤：",
	consoleInformation: "資訊：",
	consoleWarning: "警告：",
	exitTitle: "離開",
	helpTitle: "幫助",
	labelTitle: "標籤",
	localStorageTitle: "本機儲存",
	secretTitle: "秘密"
};
module.exports = languageKey;
