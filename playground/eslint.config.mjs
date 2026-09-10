import js from "@eslint/js";
import next from "eslint-config-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-config-prettier";

const config = [
  { ignores: [".next/", "playwright-report/", "coverage/", "node_modules/"] },

  js.configs.recommended,
  ...next,
  ...tsPlugin.configs["flat/recommended"],
  prettier,

  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "prefer-const": "error",
      "react-hooks/exhaustive-deps": "error",

      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: true,
        },
      ],

      "@next/next/no-img-element": "off",

      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/immutability": "warn",
    },
  },

  // Config files use CommonJS require()
  {
    files: ["*.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default config;
