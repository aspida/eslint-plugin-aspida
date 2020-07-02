import {
  TSESLint,
  TSESTree,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

const messages = {
  non_property_signature: "property signatures are only valid",
};

const plugin: TSESLint.RuleModule<keyof typeof messages, never[]> = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow non-property signatures",
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
          if (method.type != AST_NODE_TYPES.TSPropertySignature) {
            context.report({
              loc: method.loc,
              messageId: "non_property_signature",
            });
            return;
          }
          if (!method.typeAnnotation) return;
          if (
            method.typeAnnotation.typeAnnotation.type ==
            AST_NODE_TYPES.TSTypeLiteral
          ) {
            method.typeAnnotation.typeAnnotation.members.forEach((member) => {
              if (member.type != AST_NODE_TYPES.TSPropertySignature)
                context.report({
                  loc: member.loc,
                  messageId: "non_property_signature",
                });
            });
          }
        });
      },
    };
  },
};

export default plugin;
