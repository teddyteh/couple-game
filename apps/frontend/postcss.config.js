require("postcss-preset-env");

module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    "postcss-preset-env": {
      stage: 1,
      features: { "nesting-rules": false },
    },
    autoprefixer: {},
  },
};
