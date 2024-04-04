import { Buildable, ParMd } from "@daohaus/ui";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ValidNetwork, isValidNetwork } from "@daohaus/keychain-utils";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { DEFAULT_NETWORK_ID } from "../../utils/constants";
import { fetchShaman } from "../../hooks/useShamanNFT";


export const RelatedRecordField = (props: Buildable<object>) => {
    const { setValue } = useFormContext();
    const { daoChain = DEFAULT_NETWORK_ID, daoId = "", relatedRecord } = useParams();
    const [errorText, setErrorText] = useState<string | null>(null);

    const { dao, isLoading } = useDaoData({ daoChain: daoChain, daoId: daoId });

    useEffect(() => {

        const getShaman = async () => {
            if (dao && daoChain) {
                const shaman = await fetchShaman({ shamen: dao.shamen, chainId: daoChain as ValidNetwork });
                console.log(shaman)
                if (shaman) {
                    setValue("shamanAddress", shaman.shamanAddress);
                }
            }
        };
        if (relatedRecord && daoId && dao) {
            setValue(props.id, relatedRecord);
            setValue("dao", dao);
            setValue("daoChain", daoChain);
            setValue("daoAddress", daoId);

            getShaman();
        }
    }, [relatedRecord, dao, daoId, setValue, props.id]);

    if (
        (!daoChain || !isValidNetwork(daoChain)) ||
        !daoId ||
        !relatedRecord ||
        !dao ||
        isLoading
    ) {
        return
    }


    if (!errorText) {
        return (<>
            <ParMd>dao chain: {daoChain}</ParMd>
            <ParMd> dao address: {daoId}</ParMd>
            <ParMd> related record: {relatedRecord}</ParMd>
        </>);
    }

    return <ParMd style={{ color: "red" }}>{errorText}</ParMd>;
};