import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import {
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

const ReactMarkdownWrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    `;

export const Comments = ({ hash, badge }: { hash?: string, badge?: boolean }) => {
    //   const location = useLocation(); // for share link
    const [isLoadingTx, setIsLoadingTx] = useState(false);
    const [isSuccessTx, setIsSuccessTx] = useState(false);

    const { hash: hashParam } = useParams();
    const { address } = useDHConnect();
    const { daoChain, daoId } = useCurrentDao();
    const { dao } = useDaoData();

    const { successToast, errorToast, defaultToast } = useToast();
    console.log("hashParam", hashParam, hash)
    if (!hash) {
        hash = hashParam;
    }

    if (!daoId || !daoChain) {
        return null;
    }
    const { member } = useDaoMember({
        daoChain: daoChain,
        daoId: daoId,
        memberAddress: address,
    });
    const { records: parent } = useRecords({
        daoId: daoId,
        chainId: daoChain,
        recordType: "DUCE",
        hash: hash,
    });

    const { records: comments, refetch: refetchComments } = useRecords({
        daoId: daoId,
        chainId: daoChain,
        recordType: "DUCE",
        parentHash: hash,
    });


    if (!parent || !comments) {
        return <div>Loading...</div>;
    }
    console.log("parent~~~~~~~~~~~~~~", parent)
    const parsedContent: BlogPost = parent[0]?.parsedContent as BlogPost;

    const onFormComplete = () => {
        refetchComments?.();
    };

    if (badge) {
        return `(${comments.length})`
    }


    return (
        <SingleColumnLayout
            title={parsedContent?.title || "no title"}
            subtitle={"Collectors can post comments here."}
            description={`Comments (${comments.length})`}
        >

            <CardWrapper>
                {comments.length === 0 && (
                    <ArticleCard><ParLg>No comments yet. You can be the first.</ParLg></ArticleCard>
                )}
                {comments.map((comment, key) => {
                    const parsedComment: BlogPost = comment.parsedContent as BlogPost;
                    return (

                        <ArticleCard key={key}>
                            {parsedComment?.authorAddress || parsedComment?.author ? (
                                <AuthorAvatar address={parsedComment?.authorAddress || parsedComment?.author} />
                            ) : (
                                <AuthorAvatar address={ZERO_ADDRESS} />
                            )}
                            <ReactMarkdown>{parsedComment.content}</ReactMarkdown>
                            <ArticleLinks>
                                <StyledLink to={`/molochv3/${daoChain}/${daoId}/articles/${parsedComment.parentId}`}> OP detail
                                </StyledLink>
                                <StyledLink to={`/molochv3/${daoChain}/${daoId}/articles/${parsedComment.parentId}`}>
                                    created at: {new Date(Number(parsedComment.createdAt) * 1000).toString()}
                                </StyledLink>

                            </ArticleLinks>
                        </ArticleCard>

                    );
                })
                }
            </CardWrapper>
            {member && Number(member?.sharesLootDelegateShares) > 0 ? (
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
