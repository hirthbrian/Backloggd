module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb',
		'airbnb/hooks',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended',
		'plugin:flowtype/recommended',
	],
	plugins: [
		'@typescript-eslint',
		'react',
		'prettier',
		'simple-import-sort',
		'flowtype',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2021,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	rules: {
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/no-unresolved': 0,
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.ts', '.tsx'],
			},
		],
		'prettier/prettier': [
			'error',
			{
				semi: true,
				useTabs: true,
				singleQuote: true,
				trailingComma: 'all',
				printWidth: 80,
			},
		],
		'linebreak-style': ['error', 'unix'],
		semi: ['error', 'always'],
		'no-console': ['error'],
		'import/extensions': ['error', 'never'],
		'react/prop-types': 0,
		'no-underscore-dangle': ['error', { allow: ['_links'] }],
		'no-shadow': 'off',
		'class-methods-use-this': 0,
		'@typescript-eslint/no-use-before-define': ['error'],
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-shadow': ['off'],
		'@typescript-eslint/no-unused-vars': ['error'],
	},
	overrides: [
		// override "simple-import-sort" config
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							// Packages `react` related packages come first.
							['^react', '^@?\\w'],
							// Internal packages.
							['^(@|components)(/.*|$)'],
							// Side effect imports.
							['^\\u0000'],
							// Parent imports. Put `..` last.
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							// Other relative imports. Put same-folder imports and `.` last.
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
							// Style imports.
							['^.+\\.?(css)$'],
						],
					},
				],
			},
		},
	],
};
