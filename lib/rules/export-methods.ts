import {
  TSESLint,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

const messages = {
  no_export: "Methods should be exported",
};

const plugin: TSESLint.RuleModule<keyof typeof messages, never[]> = {
  meta: {
    type: "problem",
    docs: {
      description: "ban not available keys",
      category: "Possible Errors",
      recommended: "warn",
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

        if (
          node.parent &&
          node.parent.type == AST_NODE_TYPES.ExportNamedDeclaration
        )
          return;

        context.report({
          loc: node.loc,
          messageId: "no_export",
        });
      },
    };
  },
};

export default plugin;
