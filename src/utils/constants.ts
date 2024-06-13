import { Keychain } from "@daohaus/keychain-utils";

export const NFT_DAO_REFERRER = "DHNFTCuratorShamanSummonerV0.4"; 
// NFT shaman name NFTCuratorShamanV0.2

// export const DEFAULT_NETWORK_ID = "0xaa36a7";
export const DEFAULT_NETWORK_ID = "0xa";


export const SUMMONER_URL = "https://dinhaus.github.io/din-summoner/";
export const ADMIN_URL = "https://dinhaus.github.io/din-admin/";


export const TCR_GRAPH_URL: Keychain = {
    "0x1": "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr",
    "0x5": "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-goerli",
    "0xa": "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-optimism",
    "0x64":
      "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-gnosis",
    "0xaa36a7": "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-sepolia",
  };

export const DEFAULT_GRAPH_URL = `https://gateway-arbitrum.network.thegraph.com/api/${process.env["NX_GRAPH_API_KEY_MAINNET"]}/subgraphs/id/CgH5vtz9CJPdcSmD3XEh8fCVDjQjnRwrSawg71T1ySXW`;