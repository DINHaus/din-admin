import { Buildable, ParMd } from "@daohaus/ui";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ValidNetwork, isValidNetwork } from "@daohaus/keychain-utils";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { DEFAULT_NETWORK_ID } from "../../utils/constants";
import { fetchShaman } from "../../hooks/useShamanNFT";
import { useRecordById } from "../../hooks/useRecordById";
import { ArticleListItem } from "../ArticleListItem";
import { BlogPost } from "../../utils/types";


export const RelatedRecordField = (props: Buildable<object>) => {
    const { setValue } = useFormContext();
    const { daoChain = DEFAULT_NETWORK_ID, daoId = "", relatedRecord } = useParams();
    const [errorText, setErrorText] = useState<string | null>(null);

    const getArticleUrl = (daoId: string, articleId: string, daoChain: string) => {
        return `/molochv3/${daoChain}/${daoId}/articles/${articleId}`
      }

    const { dao, isLoading } = useDaoData({ daoChain: daoChain, daoId: daoId });
    if (!relatedRecord) {
        setErrorText("missing record id");
        return
    }
    const { record } = useRecordById({ daoId, chainId: daoChain as ValidNetwork, recordId: relatedRecord });
    console.log("related rec", record);
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
        if (relatedRecord && record && daoId && dao) {
            setValue(props.id, relatedRecord);
            setValue("dao", dao);
            setValue("daoChain", daoChain);
            setValue("daoAddress", daoId);
            setValue("authorAddress", (record.parsedContent as unknown as BlogPost).authorAddress);
            setValue("title", `Curate: ${(record.parsedContent as unknown as BlogPost).title}`);
            setValue("content", ``);
            setValue("contentHash", (record.parsedContent as unknown as BlogPost).id);
            setValue("link", getArticleUrl(daoId, (record.parsedContent as unknown as BlogPost).id, daoChain));
            getShaman();
        }
    }, [relatedRecord, record, dao, daoId, setValue, props.id]);

    if (
        (!daoChain || !isValidNetwork(daoChain)) ||
        !daoId ||
        !relatedRecord ||
        !dao ||
        !record ||
        isLoading
    ) {
        return
    }

    const parsedContent: BlogPost = record.parsedContent as unknown as BlogPost;


    if (!errorText) {
        return (<>
            <ParMd>dao chain: {daoChain}</ParMd>
            <ParMd> dao address: {daoId}</ParMd>
            <ArticleListItem parsedContent={parsedContent} />
        </>);
    }

    return <ParMd style={{ color: "red" }}>{errorText}</ParMd>;
};