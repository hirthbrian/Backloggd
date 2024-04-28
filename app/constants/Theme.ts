const genericColors = {
	blue: '#007BFF',
	purple: '#9E00B4',
	red: '#D70D45',
	white: '#FFFFFF',
	lightGrey: '#D3D3D3',
};

export const MyLightTheme = {
	dark: false,
	colors: {
		background: '#F4F4F8',
		border: 'green',
		card: '#FFFFFF',
		notification: 'blue',
		primary: '#FC430A',
		text: '#212529',
		...genericColors,
	},
};

export const MyDarkTheme = {
	dark: true,
	colors: {
		background: '#1D2021',
		border: 'green',
		card: '#232627',
		notification: 'blue',
		primary: '#FC430A',
		text: '#D1CDC7',
		...genericColors,
	},
};
