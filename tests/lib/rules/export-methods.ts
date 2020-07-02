import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "@/rules/export-methods";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});
tester.run("export-methods", rule, {
  valid: [
    {
      code: `
      export interface Methods {
        get: any;
      }
    `,
    },
    {
      code: `
        interface OtherInterface {
          get: any;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
      interface Methods {
        get: any;
      }
    `,
      errors: [{ messageId: "no_export" }],
    },
  ],
});
