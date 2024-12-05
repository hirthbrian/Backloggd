module.exports = {
	root: true,
	extends: '@react-native',
	plugins: ['simple-import-sort'],
	rules: {
		'react-native/no-unused-styles': 1,
		'simple-import-sort/imports': 1,
		'simple-import-sort/exports': 1,
	},
};
