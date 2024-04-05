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
import { ArticleListItem } from "../components/ArticleListItem";


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

export const StagingDAO = ({ badge }: { daoId?: string, badge?: boolean }) => {
    //   const location = useLocation(); // for share link

    const { address, chainId } = useDHConnect();

    const { daoChain, daoId } = useCurrentDao();
    const { dao } = useDaoData();

    if (!daoId || !daoChain) {
        return null;
    }

    const { member } = useDaoMember({
        daoChain: daoChain,
        daoId: daoId,
        memberAddress: address,
    });

    const { records: comments, refetch: refetchComments } = useRecords({
        daoId: daoId,
        chainId: chainId || "0xaa36a7", // Assign a default value to chainId
        recordType: "DUCE",
    });

    const onFormComplete = () => {
        refetchComments?.();
    };

    if (!comments) {
        return <div>Loading Comments on {chainId}...</div>;
    }


    const fillteredComments = comments.filter((comment) => {
        return (comment.parsedContent as BlogPost)?.parentId === "";
    });

    if (badge) {
        return `(${comments.length})`
    }


    return (
        <SingleColumnLayout
            title={daoId ? `Echos on ${dao?.name ?? daoId}` : `All Comments`}
            subtitle={"Collectors can post comments on posts."}
            description={`Echo (${fillteredComments.length})`}
        >

            <CardWrapper>
                {fillteredComments.length === 0 && (
                    <ArticleCard><ParLg>No comments yet. You can be the first.</ParLg></ArticleCard>
                )}
                {fillteredComments?.map((record, key) => {
          const parsedContent: BlogPost = record.parsedContent as BlogPost;
          return (
            <ArticleListItem parsedContent={parsedContent} key={key} />
          );
        })}

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
