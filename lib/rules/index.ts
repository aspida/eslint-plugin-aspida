import { TSESLint } from "@typescript-eslint/experimental-utils";

import extra_members from "./extra-members";
import identifier_key from "./identifier-key";
import non_property_signature from "./non-property-signature";
import old_members from "./old-members";
import refer_type from "./refer-type";
import wrong_type_annotations from "./wrong-type-annotations";
import validate_methods from "./validate-methods";

const rules: TSESLint.Linter.Plugin["rules"] = {
  "extra-members": extra_members,
  "identifier-key": identifier_key,
  "non-property-signature": non_property_signature,
  "old-members": old_members,
  "refer-type": refer_type,
  "validate-methods": validate_methods,
  "wrong-type-annotations": wrong_type_annotations,
};

export default rules;
