/** @format */

module.exports = {
	transform: {
		"^.+\\.[jt]sx?$": "babel-jest",
	},
	verbose: true,
	testEnvironment: "jsdom",
	coverageDirectory: "<rootDir>/coverage/",
	collectCoverageFrom: ["src/**/*.+(ts|tsx)"],
	testRegex: "(/(__)?tests(__)?/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
}
