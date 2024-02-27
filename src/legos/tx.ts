import { buildMultiCallTX } from "@daohaus/tx-builder";
import { DOMAIN_CONTRACT } from "./contract";
import { CONTRACT } from "@daohaus/moloch-v3-legos";
import { POSTER_TAGS } from "@daohaus/utils";
import { PROPOSAL_TYPE_IDS } from "../utils/ProposalData";


export const APP_TX = {
    COLLECT: {
        id: "COLLECT",
        contract: DOMAIN_CONTRACT.NEW_POST,
        method: 'collect',
        args: [
          ".postId"
        ],
        disablePoll: true,
      },
    COMMENT: {
      id: "COMMENT",
      contract: CONTRACT.POSTER,
      method: 'post',
      args: [
        {
          type: 'JSONDetails',
          jsonSchema: {
            daoId: ".dao.id",
            table: { type: 'static', value: 'DINComment' },
            queryType: { type: 'static', value: 'list' },
            content: '.formValues.content',
            parentId: '.formValues.commentParentId',
            id: '.formValues.contentHash',
            author: '.memberAddress',
            createdAt: '.formValues.createdAt',
            chainId: ".chainId"
          },
        },
        { type: 'static', value: POSTER_TAGS.daoDatabaseSharesOrLoot },
      ],
    },
    NEW_SUBTOPIC: buildMultiCallTX({
        id: "NEW_SUBTOPIC",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.content`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: PROPOSAL_TYPE_IDS.SubTopic },
      },
    },
    actions: [{
        contract: DOMAIN_CONTRACT.NEW_POST,
        method: 'post',
        args: [
          ".memberAddress",
          ".formValues.contentHash",
          {
            type: "JSONDetails",
            jsonSchema: {
              daoId: ".dao.id",
              table: { type: 'static', value: 'DIN' },
              queryType: { type: 'static', value: 'list' },
              title: ".formValues.title",
              content: ".formValues.content",
              contentURI: ".formValues.link",
              contentURIType: { type: "static", value: "url" },
              // imageURI: ".formValues.image",
              // imageURIType: { type: "static", value: "url" },
              parentId: { type: "static", value: "0" },
              id: ".formValues.contentHash",
              authorAddress: ".memberAddress",
              createdAt: '.formValues.createdAt',
              chainId: `.chainId`
              
            },
          },
        ],
      }
    ],
    }),
}
