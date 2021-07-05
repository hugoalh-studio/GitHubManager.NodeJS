const ghmVersion = require("../internal/version.js");
const languageMatrix = {
	applicationHeaderPadding: " ".repeat(42),
	applicationName: "GitHub管家（NodeJS指令版本）"
};
const languageKey = {
	accountRateLimitTableHeaderLimit: "限制",
	accountRateLimitTableHeaderRemain: "剩餘",
	accountRateLimitTableHeaderResetAtISOUTC: "重置於（國際標準世界協調時間）",
	accountRateLimitTableHeaderResetAtLocale: "重置於（本地時間）",
	accountRateLimitTableHeaderResource: "資源",
	accountTitle: "帳戶",
	applicationHeader: `${languageMatrix.applicationHeaderPadding}\n    ${languageMatrix.applicationName}v${ghmVersion.semantic}    \n${languageMatrix.applicationHeaderPadding}`,
	applicationName: languageMatrix.applicationName,
	buttonBack: "返回",
	buttonCancel: "取消",
	buttonConfirm: "確定",
	consoleError: "錯誤：",
	consoleInformation: "資訊：",
	consoleWarning: "警告：",
	exitTitle: "離開",
	errorUnknownCommand: "未知的指令「%command%」！",
	helpTitle: "幫助",
	labelTitle: "標籤",
	localStorageTitle: "本機儲存",
	migrateTitle: "遷移",
	secretTitle: "秘密",
	warningMissingGitHubToken: "缺少GitHub令牌（可能還沒有登入）！可能會在未來導致錯誤。",
	warningUnknownInput: "未知的輸入「%input%」！可能會在未來導致錯誤。"
};
module.exports = languageKey;
