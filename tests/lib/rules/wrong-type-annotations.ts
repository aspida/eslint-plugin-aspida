import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "@/rules/wrong-type-annotations";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});
tester.run("wrong-type-annotations", rule, {
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
          query: {
            hoge;
          };
        };
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
      errors: [{ messageId: "wrong_type_annotation" }],
    },
    {
      code: `
      interface Methods {
        get: string;
      }
    `,
      errors: [{ messageId: "wrong_type_annotation" }],
    },
    {
      code: `
      interface Methods {
        get;
      }
    `,
      errors: [{ messageId: "no_type_annotation" }],
    },
    {
      code: `
      interface Methods {
        get: {
          query;
        }
      }
    `,
      errors: [{ messageId: "no_type_annotation" }],
    },
  ],
});
