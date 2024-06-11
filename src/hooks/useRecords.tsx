import { useQuery } from "react-query";

import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { listRecords } from "@daohaus/moloch-v3-data";
import { handleErrorMessage } from "@daohaus/utils";
import { BlogPost } from "../utils/types";

const defaultGraphApiKeys = {
  "0x1": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0x64": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0xaa36a7": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0xa": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,


};

type Record = {
  id: string;
  createdAt: string;
  createdBy: string;
  tag: string;
  table: string;
  contentType: string;
  content: string;
  queryType: string;
  dao: {
    id: string;
  };
  parsedContent: {
    daoId: string;
    table: string;
    queryType: string;
    title: string;
    description: string;
    contentURI: string;
    contentURIType: string;
    imageURI: string;
    imageURIType: string;
    contentHash: string;
    hash: string;
    id: string;
    parentId: string;
  };
};



const fetchRecords = async ({
  daoId,
  chainId,
  recordType,
  hash,
  parentHash,
  pageSize,
  offset,
  graphApiKeys,
}: {
  daoId?: string;
  chainId: ValidNetwork;
  recordType: string;
  hash?: string;
  parentHash?: string;
  pageSize: number;
  offset: number;
  graphApiKeys: Keychain;
}) => {
  try {
    let data;
    // get all comments if daoid is null
    if (!daoId) {
      data = await listRecords({
        networkId: chainId,
        graphApiKeys: graphApiKeys,
        filter: { table: recordType },
        paging: { pageSize, offset },
      });
    } else {
      data = await listRecords({
        networkId: chainId,
        graphApiKeys: graphApiKeys,
        filter: { dao: daoId, table: recordType },
        paging: { pageSize, offset },
      });
    }


    for (let i = 0; i < data.items.length; i++) {
      (data.items[i].parsedContent as BlogPost).tag = recordType;
    }


    if (hash && recordType === "DUCEREF") {
      console.log("hash recordtype", hash, recordType);
      const filteredData = data.items.filter(
        (item) => {
          return (item as Record)?.parsedContent?.id === hash
        }

      );
      console.log("filteredData DIN", filteredData);
      return filteredData;
    } else if (hash && recordType === "DUCE") {

      const filteredData = data.items.filter(
        (item) => {
          return (item as Record)?.parsedContent?.id === hash
        }
      );
      console.log("filteredData", filteredData);
      return filteredData;
    } else if (parentHash && recordType === "DUCE") {

      const filteredData = data.items.filter(
        (item) => {
          return (item as Record)?.parsedContent?.parentId === parentHash
        }
      );
      console.log("filteredData", filteredData);
      return filteredData;
    } else if (recordType === "DUCE") {

      return data.items.filter(
        (item) => {
          return (item as Record)?.parsedContent.description !== ""
        }
      );
    }



    return data.items;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: "Error fetching records" })
    );
  }
};

export const useRecords = ({
  daoId,
  chainId,
  recordType,
  hash,
  parentHash,
  pageSize = 100,
  offset = 0,
  graphApiKeys = defaultGraphApiKeys,
}: {
  daoId?: string;
  chainId: ValidNetwork;
  recordType: string;
  hash?: string;
  parentHash?: string;
  pageSize?: number;
  offset?: number;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [`${daoId || 'all'}_${recordType}_h${hash || ""}-ph${parentHash || ""}`, { daoId, chainId }],
    () =>
      fetchRecords({
        daoId,
        chainId: chainId as ValidNetwork,
        recordType,
        hash,
        parentHash,
        pageSize,
        offset,
        graphApiKeys,
      }),
    { enabled: !!chainId }
  );

  return { records: data, error: error as Error | null, ...rest };
};