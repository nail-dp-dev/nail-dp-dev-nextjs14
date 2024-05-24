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
    colrs: {
      '':'',
    },
    screens: {
      'ph': [{'min': '0px', 'max': '320px'},],
      'tb': [{'min': '320px', 'max': '600px'},],
      'lt': [{'min': '600px', 'max': '1280px'},],
      'dt': [{ 'min': '1280px' }],
    }
  },
  plugins: [],
};
export default config;
