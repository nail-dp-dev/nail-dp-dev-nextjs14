/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(archive)/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(archive)/components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'menu-shadow': '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
        'search-shadow': '4px 4px 8px 0px rgba(0, 0, 0, 0.25) ',
      },
      fontSize: {
        '10xl': [
          '10rem',
          {
            lineHeight: '1',
          },
        ],
      },
    },
    colors: {
      // Original
      white: '#FFFFFF',
      black: '#000000',

      // Theme
      themeDark: '#121212',

      // Text
      textBlack: '#141217',
      textDarkPurple: '#756982',
      textLightYellow: '#F9F3E7',
      textKakao: '#191919',
      textGoogle: '#1F1F1F',

      // Social bg
      kakaoYellow: '#FEE500',
      naverGreen: '#03C75A',
      googleGray: '#F2F2F5',

      // Gray 1
      lightGray: '#F2F2F5',
      inputLightGray: '#F2F2F5',
      menuLightGray: '#F2F2F5',
      buttonLightGray: '#F2F2F5',

      // Gray 2
      hashTagGray: '#F2F0F5',

      // Gray 3
      darkGray: '#E0DEE3',
      buttonDarkGray: '#E0DEE3',
      navBotSolidGray: '#E0DEE3',

      // Gray 4
      navMenuBotSolidGray: '#E5E8EB',

      // Gray 5
      addFolderGray: '#D9D9D9',

      // Gray 6
      postInputGray: '#E0DBE5',

      // Purple 1
      purple: '#B98CE0',

      // Purple 2
      darkPurple: '#756982',

      // Red
      red: '#FF007A',

      // Orange
      orange: '#FFAC30',
      searchOrange: '#FFAC30',

      // Yellow
      lightYellow: '#F9F3E7',

      modalBackground: 'rgba(117, 105, 130, 0.4)',
    },

    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};

export default config;
