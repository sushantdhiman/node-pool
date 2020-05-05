module.exports = {
  rules: {
    strict: ["warn", "global"],
    "no-var": "error",
    "prefer-const": "error",
    semi: ["error", "always"],
    "prefer-arrow-callback": "error",
    "no-caller": "error",
    "no-undef": "error",
    "no-unused-vars": "error",
    "no-irregular-whitespace": "error",
  },
  extends: ["plugin:prettier/recommended", "plugin:flowtype/recommended"],
  parserOptions: {
    ecmaVersion: 6,
  },
  plugins: ["flowtype"],
  parser: "babel-eslint",
  env: {
    node: true,
    es6: true,
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
};
