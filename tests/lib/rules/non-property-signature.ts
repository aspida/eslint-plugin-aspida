import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "@/rules/non-property-signature";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});
tester.run("non-property-signature", rule, {
  valid: [
    {
      code: `
      interface Methods {
        get: {
          key: any
        };
      }
    `,
    },
    {
      code: `
        interface Methods {
          get: {
            key: {
              [a: string]: any;
            };
          };
        }
      `,
    },
    {
      code: `
        interface OtherInterface {
          get: {
            [key: string]: any;
          };
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
      interface Methods {
        [key: string]: any;
      }
    `,
      errors: [{ messageId: "non_property_signature" }],
    },
    {
      code: `
      interface Methods {
        get: {
          [key: string]: any;
        };
      }
    `,
      errors: [{ messageId: "non_property_signature" }],
    },
  ],
});
