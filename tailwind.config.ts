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
      // Original
      white: "#FFFFFF",
      black: "#000000",

      // Theme
      themeDark: "#121212",

      // Text
      textBlack: "#141217",
      textDarkPurple: "#756982",
      textLightYellow: "#F9F3E7",
      textKakao: "#191919",
      textGoogle: "#1F1F1F",

      // Social bg
      kakaoYellow: "#FEE500",
      naverGreen: "#03C75A",
      googleGray: "#F2F2F5",

      // Gray 1
      lightGray: "#F2F2F5",
      inputLightGray: "#F2F2F5",
      menuLightGray: "#F2F2F5",
      buttonLightGray: "#F2F2F5",

      // Gray 2
      hashTagGray: "#F2F0F5",

      // Gray 3
      darkGray: "#E0DEE3",
      buttonDarkGray: "#E0DEE3",
      navBotSolidGray: "#E0DEE3",

      // Gray 4
      navMenuBotSolidGray: "#E5E8EB",

      // Gray 5
      addFolderGray: "#D9D9D9",

      // Gray 6
      postInputGray: "#E0DBE5",

      // Purple 1
      purple: "#B98CE0",

      // Purple 2
      darkPurple: "#756982",

      // Red
      red: "#FF007A",

      // Orange
      orange: "#FFAC30",
      searchOrange: "#FFAC30",

      // Yellow
      lightYellow: "#F9F3E7",
    },

    screens: {
      ph: [{ min: "360px", max: "580px" }],
      tb: [{ min: "581px", max: "1279px" }],
      lt: [{ min: "1280px", max: "1838px" }],
      dt: [{ min: "1839px" }],
    },
  },
  plugins: [],
};
export default config;
