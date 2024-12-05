module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@contexts': './src/infrastructure/contexts',
					'@entities': './src/domain/entities',
					'@texts': './src/ui/atoms/Texts',
					'@themes': './src/ui/themes',
				},
			},
		],
		'react-native-reanimated/plugin',
	],
};
