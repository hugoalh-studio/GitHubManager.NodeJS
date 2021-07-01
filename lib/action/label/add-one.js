const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../../internal/console.js");
/**
 * @private
 * @function actionLabelAddLocalStorage
 * @param {string} name
 * @param {string} color
 * @param {string} description
 * @returns {void}
 */
function actionLabelAddLocalStorage(name, color, description) {
	const localStorage = require("../../internal/local-storage.js");
	let data = localStorage.read("label");
	data[name] = {
		color,
		description
	};
	localStorage.write("label", data);
};
/**
 * @private
 * @function actionLabelAddNetworkRepository
 * @async
 * @param {string} repositoryOwner
 * @param {string} repositoryName
 * @param {string} name
 * @param {string} color
 * @param {string} description
 * @returns {void}
 */
async function actionLabelAddNetworkRepository(repositoryOwner, repositoryName, name, color, description) {
	const githubREST = require("../../bridge/rest.js").read();
	let data = await githubREST.issues.createLabel({
		color: color,
		description: description,
		name: name,
		owner: repositoryOwner,
		repo: repositoryName
	}).catch((error) => {
		throw new Error(error);
	});
	if (data.status !== 201) {
		internalConsole.warning(`Receive status code ${data.status}! Maybe cause error in the beyond.`);
	};
};
/**
 * @private
 * @function actionLabelAdd
 * @param {string} target
 * @param {string} name
 * @param {string} color
 * @param {string} description
 * @returns {void}
 */
function actionLabelAdd(target, name, color, description = "") {
	if (advancedDetermine.isString(target) !== true) {
		throw new TypeError(`Argument "target" must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isString(name) !== true) {
		throw new TypeError(`Argument "name" must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isString(color) !== true) {
		throw new TypeError(`Argument "color" must be type of string (non-nullable)!`);
	};
	if (color.search(/^[\da-f][\da-f][\da-f][\da-f][\da-f][\da-f]$/giu) !== 0) {
		throw new SyntaxError(`Argument "color" is not match the require pattern!`);
	};
	color = color.toLowerCase();
	switch (target.toLowerCase()) {
		case "def":
		case "default":
			throw new Error(`Cannot modify default label!`);
		case "local-storage":
		case "local":
		case "localstorage":
		case "ls":
		case "storage":
			return actionLabelAddLocalStorage(name, color, description);
		default:
			if (target.search(/^@[\w\d\-._]+$/giu) === 0) {
				throw new Error(`Label is not support organization!`);
			};
			if (target.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = target.split("/");
				return actionLabelAddNetworkRepository(repositoryOwner, repositoryName, name, color, description);
			};
			throw new SyntaxError(`Argument "repository"'s value is not match the require pattern!`);
	};
};
module.exports = actionLabelAdd;
