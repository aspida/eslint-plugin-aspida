import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "@/rules/old-members";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});
tester.run("old-members", rule, {
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
        interface OtherInterface {
          get: {
            reqData: any;
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
          reqData: any;
        }
      }
    `,
      errors: [
        { messageId: "old_member", data: { old: "reqData", new: "reqBody" } },
      ],
    },
    {
      code: `
      interface Methods {
        get: {
          resData: any;
        };
      }
    `,
      errors: [
        { messageId: "old_member", data: { old: "resData", new: "resBody" } },
      ],
    },
  ],
});
