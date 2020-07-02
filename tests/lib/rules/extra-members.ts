import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "@/rules/extra-members";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});
tester.run("extra-members", rule, {
  valid: [
    {
      code: `
      interface Methods {
        get:{
          query: any;
          reqBody: any;
          resBody: any;
          status: any;
          reqFormat: any;
        };
      }
    `,
    },
    {
      code: `
        interface OtherInterface {
          get: {
            hoge: any;
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
          hoge: any;
        };
      }
    `,
      errors: [{ messageId: "extra_member", data: { name: "hoge" } }],
    },
  ],
});
