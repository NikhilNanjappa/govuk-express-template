import dwpConfigBase from "@dwp/eslint-config-base";
import pluginImport from "eslint-plugin-import";
import globals from "globals";

export default [
  ...dwpConfigBase,
  {
    plugins: {
      import: pluginImport,
    },
  },
  {
    files: ["src/**/*.js"],
  },
  {
    ignores: ["dist/*", "src/public/*"],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        cy: true,
        before: true,
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    rules: {
      "no-restricted-exports": 0,
      "no-nested-ternary": "off",
      "prefer-promise-reject-errors": "off",
      "import/no-import-module-exports": 0,
      "no-param-reassign": [2, { props: false }],
    },
  },
];
