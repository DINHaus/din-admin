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
    description: "If accepted it will be ratify on-chain, and you will recieve 1 curator share of the Topic DAO.",
    requiredFields: { pubTitle: true, content: true },
    log: true,
    tx: APP_TX.NEW_SUBTOPIC as TXLego,
    fields: [
      // APP_FIELD.IMAGE_FIELD,
      APP_FIELD.RELATED_RECORD_FIELD,
      APP_FIELD.CREATEDAT_FIELD,
      APP_FIELD.TAGS_MULTISELECT_FIELD,
      APP_FIELD.CONTENTHASH_FIELD,
      FIELD.PROP_OFFERING,
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
      {...APP_FIELD.CONTENT_FIELD, type: "mdxEditor", label: "Comment"},
      APP_FIELD.COMMENTPARENTID_FIELD,
      APP_FIELD.CREATEDAT_FIELD,
      APP_FIELD.CONTENTHASH_FIELD,
    ],
  },
  PROMOTE_DRAFT: {
    id: "PROMOTE_DRAFT",
    title: "Draft Form",
    subtitle: "drafts",
    description: "Create and edit local drafts.",
    requiredFields: { content: true },
    submitButtonText: "Promote Draft",
    log: true,
    // tx: APP_TX.NEW_SUBTOPIC as TXLego,
    tx: APP_TX.COMMENTNFT as TXLego,

    fields: [
      APP_FIELD.COMMENTPARENTID_FIELD,
      APP_FIELD.TITLE_FIELD,
      APP_FIELD.LINK_FIELD,
      {...APP_FIELD.CONTENT_FIELD, type: "mdxEditor", label: "Comment"},
      APP_FIELD.CREATEDAT_FIELD,
      APP_FIELD.CONTENTHASH_FIELD,
      APP_FIELD.TAGS_MULTISELECT_FIELD,
      APP_FIELD.SAVEASDRAFT_FIELD,
    ],
  },
  BROKER_CONTENT: {
    id: "ROKER_CONTENT",
    title: "Coming soon...",
    subtitle: "Enter the world of data daos",
    description: "Submit a piece of content to be brokered by the DAO.",
    requiredFields: { content: true },
    submitButtonText: "Promote Draft",
    log: true,
    tx: APP_TX.COMMENT as TXLego,
    fields: [
      
    ],
  },
};