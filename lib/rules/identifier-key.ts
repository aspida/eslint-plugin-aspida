import {
  TSESLint,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

const messages = {
  non_string_key: "Keys should be string",
  non_identifier_key: "Keys should be identifier look.",
};

const plugin: TSESLint.RuleModule<keyof typeof messages, never[]> = {
  meta: {
    type: "suggestion",
    docs: {
      description: "validates HTTP method name in aspida api definition",
      category: "Possible Errors",
      recommended: "error",
      url: "",
    },
    fixable: undefined,
    schema: [],
    messages,
  },
  create: (context) => {
    return {
      TSInterfaceDeclaration: (node) => {
        if (node.id.name !== "Methods") return;

        node.body.body.forEach((method) => {
          if (method.type !== AST_NODE_TYPES.TSPropertySignature) return;
          if (method.key.type == AST_NODE_TYPES.Literal) {
            const val = method.key.value;
            if (typeof val !== "string") {
              context.report({
                loc: method.key.loc,
                messageId: "non_string_key",
              });
            } else {
              context.report({
                loc: method.key.loc,
                messageId: "non_identifier_key",
              });
            }
          } else if (method.key.type != AST_NODE_TYPES.Identifier) {
            context.report({
              loc: method.key.loc,
              messageId: "non_identifier_key",
            });
          }
        });
      },
    };
  },
};

export default plugin;
