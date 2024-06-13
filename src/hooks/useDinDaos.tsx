import { useQuery } from "react-query";

import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { listDaos, listRecords } from "@daohaus/moloch-v3-data";
import { handleErrorMessage } from "@daohaus/utils";
import { NFT_DAO_REFERRER } from "../utils/constants";

const defaultGraphApiKeys = {
  "0x1": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0x64": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0xa": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,

};


const fetchRecords = async ({

  chainId,
  pageSize,
  offset,
  graphApiKeys,
}: {
  chainId: ValidNetwork;
  hash?: string;
  pageSize: number;
  offset: number;
  graphApiKeys: Keychain;
}) => {
  try {
    const data = await listDaos({
        networkId: chainId,
        filter: {
          referrer: NFT_DAO_REFERRER,
        },
        graphApiKeys: defaultGraphApiKeys,
      });


    return {data};
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: "Error fetching records" })
    );
  }
};

export const useDinDAOs = ({
  chainId,
  pageSize = 100,
  offset = 0,
  graphApiKeys = defaultGraphApiKeys,
}: {
  chainId: ValidNetwork;
  pageSize?: number;
  offset?: number;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [`daos`, { chainId }],
    () =>
      fetchRecords({
        chainId: chainId as ValidNetwork,
        pageSize,
        offset,
        graphApiKeys,
      }),
    { enabled: !!chainId }
  );

  return { records: data, error: error as Error | null, ...rest };
};