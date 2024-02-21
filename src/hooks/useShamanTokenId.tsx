import { useQuery } from "react-query";

import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress, createViemClient } from "@daohaus/utils";
import NftCuratorShamanAbi from "../abis/nftCuratorShaman.json";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

export interface TokenChild {
  owner: string;
  tokenId: BigInt;
}

const fetchShaman = async ({
  shamanAddress,
  hash,
  tokenId,
  chainId,
  rpcs
}: {
  shamanAddress?: EthAddress;
  hash: string;
  tokenId?: string;
  chainId?: ValidNetwork;
  rpcs?: Keychain;
}) => {
  if (!shamanAddress || !hash || !chainId) {
    throw new Error("Missing Args");
  }
  const client = createViemClient({
    chainId,
    rpcs,
  });

  let parentId;
  let childs;
  try {
    parentId = await client.readContract({
      abi: NftCuratorShamanAbi,
      address: shamanAddress,
      functionName: "posts",
      args: [hash],
    });

    childs = await client.readContract({
      abi: NftCuratorShamanAbi,
      address: shamanAddress,
      functionName: "getAllChilds",
      args: [parentId],
    });




  } catch (e) {
    return false;
  }




  return {
    parentId,
    childs
  }

};

export const useShamanTokenId = ({
  shamanAddress,
  hash,
  tokenId,
  chainId,
}: {
  shamanAddress: EthAddress;
  hash: string;
  tokenId?: string;
  chainId?: ValidNetwork;
}) => {
  if (!shamanAddress || !hash || !chainId) {
    throw new Error("Missing Args");
  }
  const { data, error, ...rest } = useQuery(
    [`claimShaman-${shamanAddress}-${hash}}`],
    () => fetchShaman({ shamanAddress, hash, chainId }),
    { enabled: shamanAddress && !!hash }
  );

  return { ...data, error, ...rest };
};
