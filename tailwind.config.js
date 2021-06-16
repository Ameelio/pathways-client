module.exports = {
  purge: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      visibility: ["responsive", "hover", "group-hover"],
    },
    minHeight: {
      0: "0",
      "1/4": "25%;",
      full: "100%",
      screen: "100vh",
    },
  },
  plugins: [],
};
