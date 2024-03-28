import { CustomFieldLego } from "./legoConfig";

export const APP_FIELD: Record<string, CustomFieldLego> = {
  TITLE_FIELD:  {
    id: "title",
    type: "input",
    placeholder: "title",
    label: "Title",
  },
  CONTENT_FIELD: {
    id: "content",
    type: "textarea",
    placeholder: "content",
    label: "Content",
  },
  AMOUNT_FIELD:  {
    id: "amount",
    type: "toWeiInput",
    placeholder: "amount",
    label: "Amount",
  },
  LINK_FIELD:  {
    id: "link",
    type: "input",
    placeholder: "http://",
    label: "External Link",
  },
  IMAGE_FIELD:  {
    id: "image",
    type: "input",
    placeholder: "http://",
    label: "Image Header Link",
  },
  TAGS_FIELD: {
    id: "testField",
    type: "csInput",
    placeholder: "testField",
    label: "Test Field",
    itemNoun: {
        singular: 'tag',
        plural: 'tags'
      },
  },
  CONTENTHASH_FIELD: {
    id: 'contentHash',
    type: 'contentHash',
  },
  COMMENTPARENTID_FIELD: {
    id: 'commentParentId',
    type: 'commentParentId',
  },
  CREATEDAT_FIELD: {
    id: 'createdAt',
    type: 'createdAt',
  },
  SAVEASDRAFT_FIELD: {
    id: 'saveAsDraft',
    type: 'saveAsDraft',
  },
  TAGS_MULTISELECT_FIELD: {
    id: 'tags',
    type: 'multiSelect',
  },
};
