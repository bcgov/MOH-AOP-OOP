import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginCypress from "eslint-plugin-cypress";
import compat from "eslint-plugin-compat";

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } }, //eslint formatting for Node vs browser properties
  pluginJs.configs.recommended, //eslint formatting for basic Javascript syntax
  ...pluginVue.configs["flat/recommended"], //eslint formatting for Vue components
  pluginCypress.configs.globals, //eslint formatting for Cypress syntax
  compat.configs["flat/recommended"], //compatibility with browsers listed in package.json
  {
    files: ["**/*.{js,ts,jsx,tsx,mjs,cjs,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
    },
    rules: {
      "no-unused-vars": "warn",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
      "vue/html-indent": "off",
    },
  },
  {
    ignores: ["**/coverage/*", "**/dist/*", "**/.husky/"],
  },
];