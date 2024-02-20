import { useQuery } from "react-query";

import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress, createViemClient } from "@daohaus/utils";
import NftCurratorShamanAbi from "../abis/nftCurratorShaman.json";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

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
  if (!shamanAddress || !tokenId || !chainId) {
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
        abi: NftCurratorShamanAbi,
        address: shamanAddress,
        functionName: "posts",
        args: [hash],
      });

      childs = await client.readContract({
        abi: NftCurratorShamanAbi,
        address: shamanAddress,
        functionName: "getAllChilds",
        args: [parentId],
      });



    } catch (e) {
      return false;
    }


 

    return {
      parentId,
      childs,
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
    { enabled: !!shamanAddress && !!tokenId}
  );

  return { ...data, error, ...rest };
};
