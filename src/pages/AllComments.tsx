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

export const AllComments = ({ hash, badge, tableName = "DUCE" }: { hash?: string, badge?: boolean, tableName?: string }) => {
    //   const location = useLocation(); // for share link

    const { address, chainId } = useDHConnect();


    const { records: comments, refetch: refetchComments } = useRecords({
        // daoId: daoId,
        chainId: chainId || "0xaa36a7", // Assign a default value to chainId
        recordType: tableName,
        hash,
    });

    if (!comments) {
        return <div>Loading Comments on {chainId}...</div>;
    }

    if (badge) {
        return `(${comments.length})`
    }


    return (
        <SingleColumnLayout
            title={"All Comments"}
            subtitle={"Collectors can post comments on posts."}
            description={`Comments (${comments.length})`}
        >

            <CardWrapper>
                {comments.length === 0 && (
                    <ArticleCard><ParLg>No comments yet. You can be the first.</ParLg></ArticleCard>
                )}
                {comments.map((comment, key) => {
                    const parsedComment: BlogPost = comment.parsedContent as BlogPost;
                    if(!parsedComment.parentId){
                        return null;
                    }

                    return (

                        <ArticleCard key={key}>
                            {parsedComment?.authorAddress || parsedComment?.author ? (
                                <AuthorAvatar address={parsedComment?.authorAddress || parsedComment?.author} />
                            ) : (
                                <AuthorAvatar address={ZERO_ADDRESS} />
                            )}
                            <ReactMarkdown>{parsedComment.content}</ReactMarkdown>
                            <ArticleLinks>
                                <StyledLink to={`/molochv3/${chainId}/${parsedComment.daoId}/articles/${parsedComment.parentId}`}> OP detail
                                </StyledLink>
                                <StyledLink to={`/molochv3/${chainId}/${parsedComment.daoId}/articles/${parsedComment.parentId}`}>
                                    created at: {new Date(Number(parsedComment.createdAt) * 1000).toString()}
                                </StyledLink>

                            </ArticleLinks>
                        </ArticleCard>

                    );
                })
                }
            </CardWrapper>

        </SingleColumnLayout>

    );
};
