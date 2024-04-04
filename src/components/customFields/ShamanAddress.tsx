import { Buildable,  ParMd } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { hashMessage } from 'viem';
import { useShamanNFT } from "../../hooks/useShamanNFT";


export const ShamanAddressField = (props: Buildable<object>) => {
  const { watch, setValue } = useFormContext();
  const { address } = useDHConnect();
  const [errorText, setErrorText] = useState<string | null>(null);


  const [dao, daoChain] = watch([
    "dao",
    "daoChain"
  ]);

  if(!dao || !daoChain) return;
  const { shamanName, shamanAddress, sdata, isLoading: isShamanLoading } = useShamanNFT({ dao: dao, chainId: daoChain });

  useEffect(() => {
    if(!shamanAddress) return;
    setValue("shamanAddress", shamanAddress);
  }, [shamanAddress]);

  if (!errorText) {
    return null;
  }

  return <ParMd style={{ color: "red" }}>{errorText}</ParMd>;
};
