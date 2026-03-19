/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./providers/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        lm: {
          bg: "#FAF9F7",
          paper: "#FFFFFF",
          ink: "#2C2825",
          ink2: "#6B6560",
          ink3: "#A39E99",
          red: "#C0392B",
          "red-light": "#FBEAE8",
          "red-border": "#F0C9C4",
          green: "#27AE60",
          "green-light": "#E8F5E9",
          amber: "#E67E22",
          "amber-light": "#FFF8E1",
          purple: "#7C3AED",
          "purple-light": "#F3E5F5",
          border: "#E8E5E1",
        },
      },
      fontFamily: {
        outfit: ["Outfit"],
        newsreader: ["Newsreader"],
      },
    },
  },
  plugins: [],
};
