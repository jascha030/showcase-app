const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			emerald: colors.emerald,
			indigo: colors.indigo,
			yellow: colors.yellow,
			slate: colors.slate,
			'background': '#212431',
			'background-secondary': '#34324a',
			'background-highlight': '#444267',
			'foreground': '#a6accd',
			'text': '#676e95',
			'selection-background': '#717cb4',
			'selection-menu-background': '#C0C4DC',
			'accent': '#a59bff',
			'disabled': '#515772',
			'excluded': '#2f2e43',
			'contrast': '#202331',
			'logan': {
				DEFAULT: '#A6ACCD',
				50: '#FFFFFF',
				100: '#FFFFFF',
				200: '#F4F5F9',
				300: '#DADDEA',
				400: '#C0C4DC',
				500: '#A6ACCD',
				600: '#828BB9',
				700: '#5E69A5',
				800: '#495282',
				900: '#353B5E',
			},
			'razzmatazz': {
				DEFAULT: '#EA1479',
				50: '#F9BCD9',
				100: '#F8AACE',
				200: '#F484B9',
				300: '#F15EA4',
				400: '#EE398E',
				500: '#EA1479',
				600: '#B6105E',
				700: '#830B44',
				800: '#4F0729',
				900: '#1B020E',
			},
			'sunglow': {
				DEFAULT: '#FFB833',
				50: '#FFF8EB',
				100: '#FFF1D6',
				200: '#FFE3AD',
				300: '#FFD485',
				400: '#FFC65C',
				500: '#FFB833',
				600: '#FAA300',
				700: '#C27E00',
				800: '#8A5A00',
				900: '#523500',
			},
		},
		'yellow-green': '#C3E88D',
		'atlantis': {
			DEFAULT: '#92D530',
			50: '#E2F4C9',
			100: '#D9F1B8',
			200: '#C8EA96',
			300: '#B6E374',
			400: '#A4DC52',
			500: '#92D530',
			600: '#73AA23',
			700: '#547C19',
			800: '#344D10',
			900: '#151E06',
		},
		'blue': {
			DEFAULT: '#402BFF',
			50: '#E5E3FF',
			100: '#D3CEFF',
			200: '#AEA5FF',
			300: '#8A7DFF',
			400: '#6554FF',
			500: '#402BFF',
			600: '#1800F2',
			700: '#1200BA',
			800: '#0D0082',
			900: '#07004A',
		},
		'purple-heart': {
			DEFAULT: '#9734D8',
			50: '#E6CEF6',
			100: '#DDBDF2',
			200: '#CC9BEC',
			300: '#BA78E5',
			400: '#A956DF',
			500: '#9734D8',
			600: '#7922B2',
			700: '#591983',
			800: '#391054',
			900: '#190725',
		},
		extend: {}
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
