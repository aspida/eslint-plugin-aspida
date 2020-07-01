import { TSESLint } from "@typescript-eslint/experimental-utils";
const configs: TSESLint.Linter.Config = {
  overrides: [
    {
      plugins: ["aspida"],
      env: {
        node: true,
      },
      files: ["*.ts", "*.tsx"],
      rules: {},
    },
  ],
};

export default configs;
