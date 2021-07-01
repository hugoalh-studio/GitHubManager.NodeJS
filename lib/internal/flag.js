const advancedRandom = require("@hugoalh/advanced-random");
const sessionCode = advancedRandom.pool({
	length: 4,
	lowerCase: true,
	number: true
});
const flag = {
	panel: `panel_${sessionCode}`,
	wizard: `wizard_${sessionCode}`
};
module.exports = flag;
