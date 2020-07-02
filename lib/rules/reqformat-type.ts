import {
  TSESLint,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

const messages = {
  wrong_reqformat_type:
    "reqFormat should be one of [ArrayBuffer,Blob,string,FormData]",
};

const allowed_typeref = new Set(["ArrayBuffer", "Blob", "FormData"]);

const plugin: TSESLint.RuleModule<keyof typeof messages, never[]> = {
  meta: {
    type: "problem",
    docs: {
      description: "diallow invalid reqFormat type",
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
          if (method.type != AST_NODE_TYPES.TSPropertySignature) return;

          if (!method.typeAnnotation) return;
          if (
            method.typeAnnotation.typeAnnotation.type !=
            AST_NODE_TYPES.TSTypeLiteral
          )
            return;

          method.typeAnnotation.typeAnnotation.members.forEach((member) => {
            if (member.type != AST_NODE_TYPES.TSPropertySignature) return;

            if (member.key.type != AST_NODE_TYPES.Identifier) return;

            if (member.key.name != "reqFormat") return;
            if (!member.typeAnnotation) return;

            const type = member.typeAnnotation.typeAnnotation;

            if (type.type == AST_NODE_TYPES.TSStringKeyword) return;
            if (
              type.type == AST_NODE_TYPES.TSTypeReference &&
              type.typeName.type == AST_NODE_TYPES.Identifier &&
              allowed_typeref.has(type.typeName.name)
            )
              return;

            context.report({
              loc: member.typeAnnotation.typeAnnotation.loc,
              messageId: "wrong_reqformat_type",
            });
          });
        });
      },
    };
  },
};

export default plugin;
