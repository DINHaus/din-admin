import { buildMultiCallTX } from "@daohaus/tx-builder";
import { DOMAIN_CONTRACT } from "./contract";
import { TARGET_DAO } from "../targetDao";
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
    Article = "ARTICLE",
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
            description: '.formValues.pubDescription',
            hash: '.formValues.commentId',
            author: '.memberAddress',
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
        title: `.formValues.pubTitle`,
        description: `.formValues.pubDescription`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: ProposalTypeIds.Article },
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
              title: ".formValues.pubTitle",
              description: ".formValues.pubDescription",
              contentURI: ".formValues.link",
              contentURIType: { type: "static", value: "url" },
              imageURI: ".formValues.image",
              imageURIType: { type: "static", value: "url" },
              contentHash: ".formValues.contentHash",
              authorAddress: ".memberAddress",
              parentId: { type: "static", value: 0 },
            },
          },
        ],
      }
    ],
    }),
}
