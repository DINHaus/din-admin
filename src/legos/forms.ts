import { APP_FIELD } from "./fields";
import { CustomFormLego } from "./legoConfig";
import { TXLego } from "@daohaus/utils";
import { APP_TX } from "./tx";
import { FIELD } from "@daohaus/moloch-v3-legos";

export const APP_FORM: Record<string, CustomFormLego> = {
  NEW_POST: {
    id: "NEW_POST",
    title: "Sub Topic Form",
    subtitle: "Your subtopic will be reviewed by the Topic curators",
    description: "If accepted it will be ratify Smith on-chain, and you will become a curator of the Topic DAO.",
    requiredFields: { pubTitle: true, content: true },
    log: true,
    tx: APP_TX.MINT_POST as TXLego,
    fields: [
      // APP_FIELD.IMAGE_FIELD,
      APP_FIELD.TITLE_FIELD,
      {...APP_FIELD.CONTENT_FIELD, type: "markdownField"},
      APP_FIELD.LINK_FIELD,
      APP_FIELD.TAG_CHECK_LIST,
      APP_FIELD.CONTENTHASH_FIELD,
      APP_FIELD.CREATEDAT_FIELD,
      FIELD.PROP_OFFERING
    ],
  },
  NEW_COMMENT: {
    id: "NEW_COMMENT",
    title: "Comment Form",
    subtitle: "comments",
    description: "Only topic collectors can post comments.",
    requiredFields: { content: true },
    log: true,
    tx: APP_TX.COMMENT as TXLego,
    fields: [
      {...APP_FIELD.CONTENT_FIELD, type: "markdownField", label: "Comment"},
      APP_FIELD.COMMENTPARENTID_FIELD,
      APP_FIELD.CREATEDAT_FIELD,
      APP_FIELD.CONTENTHASH_FIELD,
    ],
  },
};