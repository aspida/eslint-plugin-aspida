import {
  TSESLint,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

const messages = {
  old_member: "'{{old}}' is no longer available. Do you mean '{{new}}'?",
};

export const old_members: Record<string, string> = {
  reqData: "reqBody",
  resData: "resBody",
};

const plugin: TSESLint.RuleModule<keyof typeof messages, never[]> = {
  meta: {
    type: "problem",
    docs: {
      description: "fix old keys",
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
            method.typeAnnotation.typeAnnotation.type !=
            AST_NODE_TYPES.TSTypeLiteral
          )
            return;

          method.typeAnnotation.typeAnnotation.members.forEach((member) => {
            if (member.type != AST_NODE_TYPES.TSPropertySignature) return;

            const key = member.key;

            if (key.type != AST_NODE_TYPES.Identifier) return;

            if (key.name in old_members) {
              context.report({
                loc: key.loc,
                messageId: "old_member",
                data: {
                  old: key.name,
                  new: old_members[key.name],
                },
              });
            }
          });
        });
      },
    };
  },
};

export default plugin;
