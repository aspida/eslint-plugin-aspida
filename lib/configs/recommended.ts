import { TSESLint } from "@typescript-eslint/experimental-utils";
const configs: TSESLint.Linter.Config = {
  overrides: [
    {
      plugins: ["aspida"],
      env: {
        node: true,
      },
      files: ["*.ts", "*.tsx"],
      rules: {
        "aspida/export-methods": "error",
        "aspida/extra-members": "warn",
        "aspida/identifier-key": "error",
        "aspida/non-property-signature": "error",
        "aspida/old-members": "error",
        "aspida/refer-type": "warn",
        "aspida/reqformat-type": "error",
        "aspida/validate-methods": "error",
        "aspida/wrong-type-annotations": "error",
      },
    },
  ],
};

export default configs;
