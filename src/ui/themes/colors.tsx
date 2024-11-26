import { DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
		text: '#0B1209',
		background: '#F7FBF6',
		primary: '#68AB55',
		secondary: '#9FCFCF',
		accent: '#85A5C3',
	},
};

export const darkTheme = {
	...DefaultTheme,
	dark: true,
	colors: {
		...DefaultTheme.colors,
		text: '#F0F6EE',
		background: '#060A05',
		primary: '#67AB54',
		secondary: '#305F5F',
		accent: '#3D5D7B',
	},
};
