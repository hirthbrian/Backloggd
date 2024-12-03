module.exports = {
	semi: true,
	useTabs: true,
	trailingComma: 'all',
	singleQuote: true,
	printWidth: 80,
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: ['react', 'react-native', '^@texts/(.*)$', '^[./]'],
	importOrderSeparation: true,
};
