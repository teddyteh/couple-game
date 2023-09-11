module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-teddy`
  extends: ["@couple-game/eslint-config"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
