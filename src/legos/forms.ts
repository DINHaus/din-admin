import { APP_FIELD } from "./fields";
import { CustomFormLego } from "./legoConfig";
import { TXLego } from "@daohaus/utils";
import { APP_TX } from "./tx";
import { FIELD } from "@daohaus/moloch-v3-legos";

export const APP_FORM: Record<string, CustomFormLego> = {
  NEW_POST: {
    id: "NEW_POST",
    title: "Smith Form",
    subtitle: "Super WordSmith Proposal",
    description: "Ratify Smith on-chain using a DAO proposal.",
    requiredFields: { pubTitle: true, pubDescription: true },
    log: true,
    tx: APP_TX.MINT_POST as TXLego,
    fields: [
      APP_FIELD.IMAGE_FIELD,
      APP_FIELD.TITLE_FIELD,
      {...APP_FIELD.DESC_FIELD, type: "markdownField"},
      APP_FIELD.LINK_FIELD,
      APP_FIELD.CONTENTHASH_FIELD,
      FIELD.PROP_OFFERING
    ],
  },
  NEW_COMMENT: {
    id: "NEW_COMMENT",
    title: "Comment Form",
    subtitle: "comments",
    description: "Collectors can post comment.",
    requiredFields: { pubDescription: true },
    log: true,
    tx: APP_TX.COMMENT as TXLego,
    fields: [
      {...APP_FIELD.DESC_FIELD, type: "markdownField", label: "Comment"},
      APP_FIELD.COMMENTID_FIELD,
    ],
  },
};