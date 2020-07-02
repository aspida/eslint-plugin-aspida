import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "@/rules/refer-type";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});
tester.run("refer-type", rule, {
  valid: [
    {
      code: `
      interface Methods {
        get: {
          query: any;
        };
      }
    `,
    },
    {
      code: `
      interface Methods {
        get: {
          query: Other;
        };
      }
    `,
    },
    {
      code: `
        interface OtherInterface {
          get: Other;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
      interface Methods {
        get: Other;
      }
    `,
      errors: [{ messageId: "type_ref" }],
    },
  ],
});
