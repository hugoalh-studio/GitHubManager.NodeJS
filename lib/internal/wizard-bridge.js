const {
	AutoComplete,
	Confirm,
	prompt
} = require("enquirer");
async function password(question) {
	let response = await new prompt({
		message: question,
		name: "answer",
		type: "password"
	});
	return response.answer;
};
async function text(question, defaultAnswer) {
	let option = {
		message: question,
		name: "answer",
		type: "input"
	};
	if (typeof defaultAnswer !== "undefined") {
		option.initial = defaultAnswer;
	};
	let response = await new prompt(option);
	return response.answer;
};
async function textAutomaticComplete(question, suggestionList) {
	let response = await new AutoComplete({
		choices: suggestionList,
		message: question,
		name: "answer"
	});
	return response.answer;
};
