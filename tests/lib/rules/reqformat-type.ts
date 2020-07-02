import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "@/rules/reqformat-type";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});
tester.run("reqformat-type", rule, {
  valid: [
    {
      code: `
      interface Methods {
        get: {
          reqFormat: string;
        };
      }
    `,
    },
    {
      code: `
      interface Methods {
        get: {
          reqFormat: ArrayBuffer;
        };
      }
    `,
    },
    {
      code: `
      interface Methods {
        get: {
          reqFormat: Blob;
        };
      }
    `,
    },
    {
      code: `
      interface Methods {
        get: {
          reqFormat: FormData;
        };
      }
    `,
    },
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
        interface OtherInterface {
          get: {
            reqFormat: any;
          };
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
      interface Methods {
        get: {
          reqFormat: any;
        };
      }
    `,
      errors: [{ messageId: "wrong_reqformat_type" }],
    },
    {
      code: `
      interface Methods {
        get: {
          reqFormat: Hoge;
        };
      }
    `,
      errors: [{ messageId: "wrong_reqformat_type" }],
    },
  ],
});
