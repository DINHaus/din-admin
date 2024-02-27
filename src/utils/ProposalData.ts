import { ProposalTypeIds } from "@daohaus/utils";

export const CUSTOM_APP_PROPOSAL_TYPE_LABELS: Record<string, string> = {
  NEW_SUBTOPIC: "New Sub Topic",

};

export const CUSTOM_PROPOSAL_TYPE_WARNINGS: Record<
  ProposalTypeIds | string,
  string
> = {
  INIT_VOTE: "Proposal for DAO voting signal. No transactions are executed.",
  FUND_COMPANY: "Proposal transfers ERC-20 tokens from DAO treasury.",
  BECOME_PARTNER:
    "Proposal issues voting and/or non-voting tokens from the DAO",
  ADD_PARTNER: "Proposal issues voting and/or non-voting tokens from the DAO",
};

export enum PROPOSAL_TYPE_IDS {
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
    SubTopic = "NEW_SUBTOPIC",
  }