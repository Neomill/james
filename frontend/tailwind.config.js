const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      violet: colors.violet,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue:colors.amber,
      colors: {
        custom: {
            DEFAULT: '#10B981',
            zincmedium: '#3f3f46',
            zincmediumdark: "#27272a"
        }
    }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require('tailwind-scrollbar')
  ],
};
