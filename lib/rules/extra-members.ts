import {
  TSESLint,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

const messages = {
  extra_member: "'{{name}}' is not valid member",
};

const allowed_members = new Set([
  "query",
  "reqBody",
  "resBody",
  "status",
  "reqFormat",
]);
import { old_members } from "./old-members";

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

            if (allowed_members.has(member.key.name)) return;
            if (member.key.name in old_members) return; // => old-members
            context.report({
              loc: member.key.loc,
              messageId: "extra_member",
              data: {
                name: member.key.name,
              },
            });
          });
        });
      },
    };
  },
};

export default plugin;
