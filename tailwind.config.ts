/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      '':'',
    },
    screens: {
      'ph': [{'min': '360px', 'max': '580px'},],
      'tb': [{'min': '581px', 'max': '1279px'},],
      'lt': [{'min': '1280px', 'max': '1838px'},],
      'dt': [{ 'min': '1839px' }],
    } 
  },
  plugins: [],
};
export default config;
