import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import react from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": "warn", // 未使用変数の警告
      "no-console": "warn", // console.log などの警告
      "eqeqeq": ["error", "always"], // 厳密等価演算子の強制
      "react/jsx-boolean-value": ["warn", "never"], // boolean propsは値省略
      "react/jsx-no-undef": "error", // 未定義コンポーネントの禁止
      "react/jsx-uses-react": "off", // React 17+では不要
      "react/jsx-uses-vars": "warn", // JSXで使われる変数の警告
    },
  },
);
