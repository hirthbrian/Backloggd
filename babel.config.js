module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@texts': './src/ui/atoms/Texts',
					'@entities': './src/domain/entities',
					'@themes': './src/themes',
				},
			},
		],
		'react-native-reanimated/plugin',
	],
};
