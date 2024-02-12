module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/$1',
		'^@core/(.*)$': '<rootDir>/core/$1'
	},
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest'
	},
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/../test/setup.ts']
}
