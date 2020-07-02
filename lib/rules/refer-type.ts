import {
  TSESLint,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

const messages = {
  type_ref: "Don't use type reference in Methods",
};

const plugin: TSESLint.RuleModule<keyof typeof messages, never[]> = {
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow type reference",
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

        node.body.body.forEach((method) => {
          if (method.type != AST_NODE_TYPES.TSPropertySignature) return;

          if (!method.typeAnnotation) return;
          if (
            method.typeAnnotation.typeAnnotation.type ==
            AST_NODE_TYPES.TSTypeReference
          ) {
            context.report({
              loc: method.typeAnnotation.typeAnnotation.loc,
              messageId: "type_ref",
            });
          }
          if (
            method.typeAnnotation.typeAnnotation.type !=
            AST_NODE_TYPES.TSTypeLiteral
          )
            return;
        });
      },
    };
  },
};

export default plugin;
