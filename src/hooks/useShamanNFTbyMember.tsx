import { useQuery } from "react-query";

import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress, createViemClient } from "@daohaus/utils";
import NftCuratorShamanAbi from "../abis/nftCuratorShaman.json";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

export interface TokenMeta {
  token: string;
  tokenId: BigInt;
  parentId?: string;
  hash?: string;
}


const fetchShaman = async ({
  shamanAddress,
  memberAddress,
  chainId,
  rpcs
}: {
  shamanAddress?: EthAddress;
  memberAddress: EthAddress;
  chainId?: ValidNetwork;
  rpcs?: Keychain;
}) => {
  console.log("fetchShaman", shamanAddress, memberAddress, chainId)
  if (!shamanAddress || !memberAddress || !chainId) {
    throw new Error("Missing Args");
  }
  const client = createViemClient({
    chainId,
    rpcs,
  });

  let balance;
  let tokens: TokenMeta[] = [];
  try {
    balance = await client.readContract({
      abi: NftCuratorShamanAbi,
      address: shamanAddress,
      functionName: "balanceOf",
      args: [memberAddress],
    });
    console.log("balance", balance)

    for (let i = 0; i < Number(balance); i++) {

      const tokenId = await client.readContract({
        abi: NftCuratorShamanAbi,
        address: shamanAddress,
        functionName: "tokenOfOwnerByIndex",
        args: [memberAddress, i],
      });

      const token = await client.readContract({
        abi: NftCuratorShamanAbi,
        address: shamanAddress,
        functionName: "tokenURI",
        args: [tokenId],
      });

      const parentId = await client.readContract({
        abi: NftCuratorShamanAbi,
        address: shamanAddress,
        functionName: "mints",
        args: [tokenId],
      });

      let hash;
      if(parentId === 0n){
        hash= await client.readContract({
          abi: NftCuratorShamanAbi,
          address: shamanAddress,
          functionName: "chashes",
          args: [tokenId],
        });
      } else {
        hash= await client.readContract({
          abi: NftCuratorShamanAbi,
          address: shamanAddress,
          functionName: "chashes",
          args: [parentId],
        });
      }



      tokens.push({ 
        token: token as string, 
        tokenId: tokenId as BigInt, 
        parentId: parentId as string,
        hash: hash as string
      });
    }

    return {tokens, balance};


  } catch (e) {
    console.error(e);
    return false;
  }

};

export const useShamanNFTbyMember = ({
  shamanAddress,
  memberAddress,
  chainId,
}: {
  shamanAddress: EthAddress;
  memberAddress: EthAddress;
  chainId?: ValidNetwork;
}) => {
  if (!shamanAddress || !memberAddress || !chainId) {
    throw new Error("Missing Args");
  }
  const { data, error, ...rest } = useQuery(
    [`claimShaman-${shamanAddress}-${memberAddress}}`],
    () => fetchShaman({ shamanAddress, memberAddress, chainId }),
    { enabled: shamanAddress && !!memberAddress }
  );

  return { ...data, error, ...rest };
};
