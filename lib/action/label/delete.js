const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalConsole = require("../../internal/console.js");
/**
 * @private
 * @function actionLabelDeleteLocalStorage
 * @param {string[]} names
 * @returns {void}
 */
function actionLabelDeleteLocalStorage(names) {
	const localStorage = require("../../internal/local-storage.js");
	let data = localStorage.read("label");
	names.forEach((name) => {
		delete data[name];
	});
	localStorage.write("label", data);
};
/**
 * @private
 * @function actionLabelDeleteNetworkRepository
 * @param {string} repositoryOwner
 * @param {string} repositoryName
 * @param {string[]} names
 * @returns {void}
 */
async function actionLabelDeleteNetworkRepository(repositoryOwner, repositoryName, names) {
	const githubRest = require("../../bridge/rest.js")();
	for (let index = 0; index < names.length; index++) {
		let name = names[index];
		let data = await githubRest.issues.deleteLabel({
			name: name,
			owner: repositoryOwner,
			repo: repositoryName
		}).catch((error) => {
			throw new Error(error);
		});
		if (data.status !== 204) {
			internalConsole.warning(`Receive status code ${data.status}! Maybe cause error in the beyond.`);
		};
	};
};
/**
 * @private
 * @function actionLabelDelete
 * @param {string} target
 * @param  {...string} names
 * @returns {void}
 */
function actionLabelDelete(target, ...names) {
	if (advancedDetermine.isString(target) !== true) {
		throw new TypeError(`Argument "target" must be type of string (non-nullable)!`);
	};
	switch (target.toLowerCase()) {
		case "def":
		case "default":
			throw new Error(`Cannot modify default label!`);
		case "local-storage":
		case "local":
		case "localstorage":
		case "ls":
		case "storage":
			return actionLabelDeleteLocalStorage(names);
		default:
			if (target.search(/^@[\w\d\-._]+$/giu) === 0) {
				throw new Error(`Label is not support organization!`);
			};
			if (target.search(/^[\w\d\-._]+\/[\w\d\-._]+$/giu) === 0) {
				let [repositoryOwner, repositoryName] = target.split("/");
				return actionLabelDeleteNetworkRepository(repositoryOwner, repositoryName, names);
			};
			throw new SyntaxError(`Argument "repository"'s value is not match the require pattern!`);
	};
};
module.exports = actionLabelDelete;
