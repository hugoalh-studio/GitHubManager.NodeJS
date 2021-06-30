const advancedRandom = require("@hugoalh/advanced-random");
const sessionCode = advancedRandom.pool({
	length: 4,
	lowerCase: true,
	number: true
});
const sessionFlag = {
	direct: `direct_${sessionCode}`,
	panel: `panel_${sessionCode}`,
	wizard: `wizard_${sessionCode}`
};
module.exports = sessionFlag;
