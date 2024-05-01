import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const genericColors = {
	blue: '#007BFF',
	purple: '#9E00B4',
	red: '#D70D45',
};

// primary (string): The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
// background (string): The color of various backgrounds, such as background color for the screens.
// card (string): The background color of card-like elements, such as headers, tab bars etc.
// text (string): The text color of various elements.
// border (string): The color of borders, e.g. header border, tab bar border etc.
// notification (string): The color of Tab Navigator badge.

export const MyLightTheme = {
	dark: false,
	colors: {
		...DefaultTheme.colors,
		background: '#F4F4F8',
		primary: '#FC430A', 
		text:   '#212529',
		textLight: '#495057',
		...genericColors,
	},
};

export const MyDarkTheme = {
	dark: true,
	colors: {
		...DarkTheme.colors,
		background: '#1D2021',
		primary: '#FC430A',
		text: '#D1CDC7',
		textLight: '#AFB5A6',
		...genericColors,
	},
};
