module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-teddy`
  extends: ["teddy"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
