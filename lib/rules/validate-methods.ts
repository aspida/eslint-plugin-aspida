import {
  TSESLint,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

const messages = {
  invalid_method_str: "'{{name}}' is not valid method name for HTTP",
};

const allowed_methods = new Set([
  "get",
  "head",
  "post",
  "put",
  "delete",
  "connect",
  "options",
  "trace",
  "patch",
]);

const plugin: TSESLint.RuleModule<keyof typeof messages, never[]> = {
  meta: {
    type: "problem",
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

          if (method.key.type != AST_NODE_TYPES.Identifier) return;
          if (!allowed_methods.has(method.key.name)) {
            context.report({
              loc: method.key.loc,
              messageId: "invalid_method_str",
              data: {
                name: method.key.name,
              },
            });
          }
        });
      },
    };
  },
};

export default plugin;
