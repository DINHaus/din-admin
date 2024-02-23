import { buildMultiCallTX } from "@daohaus/tx-builder";
import { DOMAIN_CONTRACT } from "./contract";
import { CONTRACT } from "@daohaus/moloch-v3-legos";
import { POSTER_TAGS } from "@daohaus/utils";

export enum ProposalTypeIds {
    Signal = "SIGNAL",
    IssueSharesLoot = "ISSUE",
    AddShaman = "ADD_SHAMAN",
    TransferErc20 = "TRANSFER_ERC20",
    TransferNetworkToken = "TRANSFER_NETWORK_TOKEN",
    UpdateGovSettings = "UPDATE_GOV_SETTINGS",
    UpdateTokenSettings = "TOKEN_SETTINGS",
    TokensForShares = "TOKENS_FOR_SHARES",
    GuildKick = "GUILDKICK",
    WalletConnect = "WALLETCONNECT",
    Topic = "TOPIC",
  }

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
    MINT_POST: buildMultiCallTX({
        id: "MINT_PROPOSAL",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.content`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: ProposalTypeIds.Topic },
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
