require("postcss-preset-env");

module.exports = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    "postcss-preset-env": {
      stage: 1,
    },
    autoprefixer: {},
  },
};
