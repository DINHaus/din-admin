import { useQuery } from "react-query";

import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { findRecord, listRecords } from "@daohaus/moloch-v3-data";
import { handleErrorMessage } from "@daohaus/utils";
import { BlogPost } from "../utils/types";

const defaultGraphApiKeys = {
  "0x1": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0x64": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
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
  recordId,
  pageSize,
  offset,
  graphApiKeys,
}: {
  daoId?: string;
  chainId: ValidNetwork;
  recordId: string;
  pageSize: number;
  offset: number;
  graphApiKeys: Keychain;
}) => {
  try {
    let data;
    // use findRecord
    data = await findRecord({
      networkId: chainId,
      recordId,
      graphApiKeys,
    });
    
    console.log("recordId data", data);
    if (!data || !data.data) {
      throw new Error("Record not found");
    }
    return data.data.record as Record;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: "Error fetching records" })
    );
  }
};

export const useRecordById = ({
  daoId,
  chainId,
  recordId,
  pageSize = 100,
  offset = 0,
  graphApiKeys = defaultGraphApiKeys,
}: {
  daoId?: string;
  chainId: ValidNetwork;
  recordId: string;
  pageSize?: number;
  offset?: number;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [`_id:${recordId}`, { daoId, chainId }],
    () =>
      fetchRecords({
        daoId,
        chainId: chainId as ValidNetwork,
        recordId,
        pageSize,
        offset,
        graphApiKeys,
      }),
    { enabled: !!chainId }
  );

  return { record: data, error: error as Error | null, ...rest };
};