import {
  TSESLint,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

const messages = {
  wrong_type_annotation: "Braced type annotations are only allowed",
  no_type_annotation: "Type annotation required",
};

const plugin: TSESLint.RuleModule<keyof typeof messages, never[]> = {
  meta: {
    type: "problem",
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

          if (!method.typeAnnotation) {
            context.report({
              loc: method.loc,
              messageId: "no_type_annotation",
            });
            return;
          }
          if (
            method.typeAnnotation.typeAnnotation.type ==
            AST_NODE_TYPES.TSTypeReference
          )
            return;
          if (
            method.typeAnnotation.typeAnnotation.type !=
            AST_NODE_TYPES.TSTypeLiteral
          ) {
            context.report({
              loc: method.typeAnnotation.typeAnnotation.loc,
              messageId: "wrong_type_annotation",
            });
            return;
          }

          method.typeAnnotation.typeAnnotation.members.forEach((member) => {
            if (member.type != AST_NODE_TYPES.TSPropertySignature) return;
            if (!member.typeAnnotation) {
              context.report({
                loc: member.loc,
                messageId: "no_type_annotation",
              });
              return;
            }
          });
        });
      },
    };
  },
};

export default plugin;
