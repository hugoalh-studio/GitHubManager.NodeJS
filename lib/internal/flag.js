const advancedRandom = require("@hugoalh/advanced-random");
const ghmSessionCode = advancedRandom.pool({
	length: 4,
	lowerCase: true,
	number: true
});
const ghmFlag = {
	wizard: `wizard_${ghmSessionCode}`
};
module.exports = ghmFlag;
