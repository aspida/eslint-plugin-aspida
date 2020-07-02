import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "@/rules/validate-methods";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});
tester.run("validate-methods", rule, {
  valid: [
    {
      code: `
      interface Methods {
        get: any;
        post: any;
        put: any;
        delete: any;
      }
    `,
    },
    {
      code: `
      interface Methods {
        ["get"]: any;
        ["post"]: any;
      }
    `,
    },
    {
      code: `
        interface OtherInterface {
          hoge: any;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
      interface Methods {
        hoge: any;
      }
    `,
      errors: [{ messageId: "invalid_method_str", data: { name: "hoge" } }],
    },
  ],
});
