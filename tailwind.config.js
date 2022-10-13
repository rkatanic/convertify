/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundImage: {
      "gradient-radial":
        "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
