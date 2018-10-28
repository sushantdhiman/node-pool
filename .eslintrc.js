module.exports = {
  "rules": {
    "strict": [
      "warn",
      "global"
    ],
    "no-var": "error",
    "prefer-const": "error",
    "semi": [
      "error",
      "always"
    ],
    "prefer-arrow-callback": "error",
    "no-caller": "error",
    "no-undef": "error",
    "no-unused-vars": "error",
    "no-irregular-whitespace": "error"
  },
  "extends": ["plugin:prettier/recommended"],
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "node": true,
    "es6": true
  }
};
