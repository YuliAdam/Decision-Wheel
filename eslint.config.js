import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    linterOptions: {
      noInlineConfig: true
    },
    rules: {
      "no-unused-expressions": "error"
    }
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    }
  }, {
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { "assertionStyle": "never" }
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { "accessibility": "explicit", "overrides": { "constructors": "off" } }
      ],
      "@typescript-eslint/member-ordering": "error",
      "class-methods-use-this": "error"
    }
  }

];