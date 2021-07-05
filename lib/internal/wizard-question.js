const { AutoComplete, Form, Input, List, NumberPrompt, Password, Toggle } = require("enquirer"),
	ghmLanguage = require("../language/main.js");
/**
 * @private
 * @function form
 * @async
 * @param {{initial:string,message:string,name:string}[]} field
 * @returns {object}
 */
async function form(field) {
	let action = new Form({
		choices: field
	});
	let response = await action.run();
	return response;
};
/**
 * @private
 * @function list
 * @async
 * @returns {string[]}
 */
async function list() {
	let action = new List({
		message: ghmLanguage.wizardListTooltip
	});
	let response = await action.run();
	return response;
};
/**
 * @private
 * @function multipleSelectSearch
 * @async
 * @param {string[]} selectionList
 * @returns {string[]}
 */
async function multipleSelectSearch(selectionList) {
	let action = new AutoComplete({
		choices: selectionList,
		message: ghmLanguage.wizardMultipleSelectSearchTooltip,
		multiple: true
	});
	let response = await action.run();
	return response;
};
/**
 * @private
 * @function number
 * @async
 * @returns {number}
 */
async function number() {
	let action = new NumberPrompt();
	let response = await action.run();
	return response;
};
/**
 * @private
 * @function password
 * @async
 * @returns {string}
 */
async function password() {
	let action = new Password();
	let response = await action.run();
	return response;
};
/**
 * @private
 * @function singleSelectSearch
 * @async
 * @param {string[]} selectionList
 * @returns {string}
 */
async function singleSelectSearch(selectionList) {
	let action = new AutoComplete({
		choices: selectionList
	});
	let response = await action.run();
	return response;
};
/**
 * @private
 * @function text
 * @async
 * @param {string} initial
 * @returns {string}
 */
async function text(initial = "") {
	let action = new Input({
		initial
	});
	let response = await action.run();
	return response;
};
/**
 * @private
 * @function toggle
 * @async
 * @returns {boolean}
 */
async function toggle() {
	let action = new Toggle({
		disabled: `n${ghmLanguage.wizardToggleNo}`,
		enabled: `y${ghmLanguage.wizardToggleYes}`,
		message: ghmLanguage.wizardToggleTooltip
	});
	let response = await action.run();
	return response;
};
module.exports = {
	form,
	list,
	multipleSelectSearch,
	number,
	password,
	singleSelectSearch,
	text,
	toggle
};
