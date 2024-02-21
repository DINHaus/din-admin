import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { TARGET_DAO } from "../targetDao";
import { useParams } from "react-router-dom";
import {
    Avatar,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTrigger,
    H1,
    ParLg,
    ParMd,
    SingleColumnLayout,
    Spinner,
    SuccessText,
    useToast,
} from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { useTxBuilder } from "@daohaus/tx-builder";
import {
    TXLego,
    handleErrorMessage,
    formatValueTo,
    fromWei,
    ZERO_ADDRESS,
    EthAddress,
} from "@daohaus/utils";

import { APP_TX } from "../legos/tx";
import { useState } from "react";
import { useCurrentDao, useDaoData, useDaoMember } from "@daohaus/moloch-v3-hooks";
import { useRecords } from "../hooks/useRecords";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { useShamanNFT } from "../hooks/useShamanNFT";
import { CollectedBy } from "../components/CollectedBy";
import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/legoConfig";

type BlogPost = {
    title: string;
    description: string;
    contentURI: string;
    imageURI: string;
    authorAddress: string;
    contentHash: string;
};

const ArticleLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 110rem;
  align-items: left;
  font-size: 1.5rem;
`;

const HeaderImageWrapper = styled.div`
  width: 100%;
  height: 20rem;
  overflow: hidden;
  margin-top: 2rem;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const DialogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SmallCardImg = styled.img`
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    margin-bottom: 2rem;
    `;

export const Comments = () => {
    //   const location = useLocation(); // for share link
    const [isLoadingTx, setIsLoadingTx] = useState(false);
    const [isSuccessTx, setIsSuccessTx] = useState(false);

    const { hash } = useParams();
    const { address } = useDHConnect();
    const { daoChain, daoId } = useCurrentDao();
    const { dao } = useDaoData();


    const { successToast, errorToast, defaultToast } = useToast();

    if (!daoId || !daoChain) {
        return null;
    }
    const { member } = useDaoMember({
        daoChain: daoChain,
        daoId: daoId,
        memberAddress: address,
      });
      console.log("member >>", member);
    const { records } = useRecords({
        daoId: daoId,
        chainId: daoChain,
        recordType: "DIN",
        hash,
    });

    const { records: comments, refetch: refetchComments } = useRecords({
        daoId: daoId,
        chainId: daoChain,
        recordType: "DINComment",
        hash,
    });

    if (!records || !comments) {
        return <div>Loading...</div>;
    }

    const parsedContent: BlogPost = records[0]?.parsedContent as BlogPost;

    const onFormComplete = () => {
        refetchComments?.();
    };


    return (
        <SingleColumnLayout
            title={"Comments"}
            subtitle={"Collectors can post comments here."}
        >
            <TitleWrapper>
                <H1>{parsedContent.title}</H1>
            </TitleWrapper>

            



            {comments.map((comment, key) => {
                const parsedComment: BlogPost = comment.parsedContent as BlogPost;
                return (
                    <Card key={key}>
                        <ReactMarkdown>{parsedComment.description}</ReactMarkdown>
                    </Card>
                );
            })
            }
            {member && Number(member?.loot) > 0 ? (
            <FormBuilder form={APP_FORM.NEW_COMMENT} customFields={AppFieldLookup} lifeCycleFns={{
                onPollSuccess: () => {
                    onFormComplete();
                },
            }} />
            ) : (
                <ParLg>Only Collectors can comment</ParLg>
            )}

        </SingleColumnLayout>

    );
};
