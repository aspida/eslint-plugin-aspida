import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "@/rules/identifier-key";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});
tester.run("identifier-key", rule, {
  valid: [
    {
      code: `
      interface Methods {
        key: any;
      }
    `,
    },
    {
      code: `
        interface OtherInterface {
          get: {
            ["key"]: any;
          };
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
      interface Methods {
        ["get"]: any;
      }
    `,
      errors: [{ messageId: "non_identifier_key" }],
    },
    {
      code: `
      interface Methods {
        [1]: any;
      }
    `,
      errors: [{ messageId: "non_string_key" }],
    },
  ],
});
