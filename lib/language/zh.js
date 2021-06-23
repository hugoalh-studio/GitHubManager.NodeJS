const internalVersion = require("../internal/version.js");
const matrix = {
	applicationHeaderPadding: "                                          ",
	applicationName: "GitHub管家（NodeJS指令版本）"
};
const languageKey = {
	accountRateLimitTableTitleLimit: "限制",
	accountRateLimitTableTitleRemain: "剩餘",
	accountRateLimitTableTitleResetAtISOUTC: "重置於\n（國際標準世界協調時間）",
	accountRateLimitTableTitleResetAtLocale: "重置於\n（本地時間）",
	accountRateLimitTableTitleResource: "資源",
	actionAccountTitle: "帳戶",
	actionExitTitle: "離開",
	actionHelpTitle: "幫助",
	actionLabelTitle: "標籤",
	actionLocalStorageTitle: "本機儲存",
	actionMigrateTitle: "遷移",
	actionSecretTitle: "秘密",
	applicationHeader: `${matrix.applicationHeaderPadding}\n    ${matrix.applicationName}v${internalVersion.semantic}    \n${matrix.applicationHeaderPadding}`,
	applicationName: `${matrix.applicationName}`,
	buttonBack: "返回",
	buttonCancel: "取消",
	buttonConfirm: "確定",
	consoleError: "錯誤：",
	consoleInformation: "資訊：",
	consoleWarning: "警告：",
	warningMissingGitHubToken: "缺少GitHub令牌（可能還沒有登入）！可能會在未來導致錯誤。",
	warningUnknownInput_1: "未知的輸入「",
	warningUnknownInput_2: "」！可能會在未來導致錯誤。"
};
module.exports = languageKey;
