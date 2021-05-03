module.exports = {
  purge: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      visibility: ['responsive', "hover", 'group-hover'],
    },
  },
  plugins: [],
};
