import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import {
    Card,
    H1,
    ParLg,
    SingleColumnLayout,
    useToast,
} from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";


import { useState } from "react";
import { useCurrentDao, useDaoData, useDaoMember } from "@daohaus/moloch-v3-hooks";
import { useRecords } from "../hooks/useRecords";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/legoConfig";
import { BlogPost } from "../utils/types";
import { ArticleCard, ArticleLinks, CardWrapper, StyledLink } from "../utils/listStyles";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { ZERO_ADDRESS } from "@daohaus/utils";

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
    console.log("comments >>>>>>>>>>>>>/////>>>>>>>>", comments);


    if (!records || !comments) {
        return <div>Loading...</div>;
    }

    const parsedContent: BlogPost = records[0]?.parsedContent as BlogPost;

    const onFormComplete = () => {
        refetchComments?.();
    };


    return (
        <SingleColumnLayout
            title={`Comments (${comments.length})`}
            subtitle={"Collectors can post comments here."}
        >
            <TitleWrapper>
                <H1>{parsedContent.title}</H1>
            </TitleWrapper>
            <ReactMarkdown>{parsedContent.content}</ReactMarkdown>




            <CardWrapper>
                {comments.map((comment, key) => {
                    const parsedComment: BlogPost = comment.parsedContent as BlogPost;
                    return (

                        <ArticleCard key={key}>
                            {parsedContent?.authorAddress ? (
                                <AuthorAvatar address={parsedContent?.authorAddress} />
                            ) : (
                                <AuthorAvatar address={ZERO_ADDRESS} />
                            )}
                            <ReactMarkdown>{parsedComment.content}</ReactMarkdown>
                            <ArticleLinks>
                                <StyledLink to={""}> detail</StyledLink>
                                <StyledLink to={""}> replys (69)</StyledLink>

                            </ArticleLinks>
                        </ArticleCard>

                    );
                })
                }
            </CardWrapper>
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
