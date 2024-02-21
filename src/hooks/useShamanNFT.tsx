import { useQuery } from "react-query";

import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress, createViemClient } from "@daohaus/utils";
import NftCuratorShamanAbi from "../abis/nftCuratorShaman.json";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

const fetchShaman = async ({
  shamen,
  chainId,
  rpcs,
}: {
  shamen?: MolochV3Dao["shamen"];
  chainId?: ValidNetwork;
  rpcs?: Keychain;
}) => {
  if (!chainId || !shamen) {
    throw new Error("Missing Args");
  }
  const client = createViemClient({
    chainId,
    rpcs,
  });

  const targetShamanName = "NFTCuratorShamanV0.1";

  const nftcuratorShaman = shamen.find(async (shaman) => {
    try {
      const shamanName = await client.readContract({
        abi: NftCuratorShamanAbi,
        address: shaman.shamanAddress as EthAddress,
        functionName: "name",
        args: [],
      });

      return shamanName === targetShamanName;
    } catch (e) {
      return false;
    }
  });

  if (nftcuratorShaman) {

    const getters = ["_price", "_authorFee", "_creatorShares", "_collectorLoot"];
    const types = ["uint256", "uint256", "uint256", "uint256"];
    let sdata: { [key: string]: { result: string; type: string } } = {};

    const shamanData = (await Promise.all(
      getters.map(async (getter) => {
        let res;
        try {
          res = await client.readContract({
            abi: NftCuratorShamanAbi,
            address: nftcuratorShaman.shamanAddress as EthAddress,
            functionName: getter,
            args: [],
          });
        } catch (e) {
          console.log("error", e);
          res = undefined;
        }

        return res;
      })
    )) as string[];

    getters.forEach((getter, i) => {
      sdata[getter] = { result: shamanData[i].toString(), type: types[i] };
    });

    return {
      shamanName: targetShamanName,
      sdata,
      shamanAddress: nftcuratorShaman.shamanAddress,
    };
  } else {
    throw new Error("Shaman not found");
  }
};

export const useShamanNFT = ({
  dao,
  chainId,
}: {
  dao?: MolochV3Dao;
  chainId?: ValidNetwork;
}) => {
  if (!dao || !chainId) {
    throw new Error("Missing Args");
  }
  const { data, error, ...rest } = useQuery(
    [`claimShaman-${dao?.id}}`],
    () => fetchShaman({ shamen: dao?.shamen, chainId }),
    { enabled: !!dao && !!dao.shamen && !!chainId }
  );

  return { ...data, error, ...rest };
};
