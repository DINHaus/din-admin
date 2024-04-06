
import React, { useState } from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { Badge, Button, Dialog, DialogContent, DialogTrigger, Input, LinkStyles, ParLg, ParMd, ParSm, Tag, Tooltip } from "@daohaus/ui";
import { ArticleCard, ArticleLinks, CardAvatar, CardDescription, CardTitle, CardTitleWrapper, StyledLink } from "../utils/listStyles";
import { AuthorAvatar } from "./AuthorAvatar";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CollectButton } from "./CollectButton";
import { Comments } from "../pages/Comments";
import { ZERO_ADDRESS } from "@daohaus/utils";
import { BlogPost } from "../utils/types";
import { DEFAULT_NETWORK_ID } from "../utils/constants";
import styled from "styled-components";
import { useRecordById } from "../hooks/useRecordById";
import { ValidNetwork, isValidNetwork } from "@daohaus/keychain-utils";

const Tags = styled.div`
display: flex;

`
const StyledExternalLink = styled.a`
${LinkStyles};
`;




export const CuratedArticleListItem = ({ relatedRecordId, parsedContent }: { relatedRecordId: string, parsedContent: BlogPost }) => {
  const { daoChain } = useParams();
  const navigate = useNavigate();

  const daoId = relatedRecordId.split("-")[0];


  const { record } = useRecordById({ daoId, chainId: daoChain as ValidNetwork, recordId: relatedRecordId });

  if (
    (!daoChain || !isValidNetwork(daoChain)) ||
    !daoId ||
    !record
  ) {
    return
  }

  const linkedParsedContent: BlogPost = record.parsedContent as unknown as BlogPost;

  const getArticleUrl = (daoId: string, articleId: string, daoChain?: string) => {
    return `/molochv3/${daoChain || DEFAULT_NETWORK_ID}/${daoId}/rarticles/${articleId}`
  }



  if (!linkedParsedContent.id || !linkedParsedContent.daoId || !linkedParsedContent.content) {
    return <ParMd>Invalid Metadata Format</ParMd>
  }

  console.log("linkedParsedContent *****************>>", linkedParsedContent)
  console.log("parsedContent *****************>>", parsedContent)

  const date = new Date(Number(linkedParsedContent.createdAt) * 1000);
  const formattedDate = `${date.getFullYear()} ${date.toLocaleString('default', { month: 'short' })} ${date.getDate()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;


  return (
    <ArticleCard>
      {/* <CardImg>
                <Link to={linkedParsedContent?.id}>
                  <img
                    src={
                      linkedParsedContent?.imageURI ||
                      "https://hackmd.io/_uploads/rkWi13-ba.png"
                    }
                  />
                </Link>
              </CardImg> */}
      <CardAvatar>
      <Tag tagColor="green">CURATED BY</Tag>

        {parsedContent?.authorAddress ? (
          <AuthorAvatar address={parsedContent?.authorAddress} />
        ) : (
          <AuthorAvatar address={ZERO_ADDRESS} />
        )}
      </CardAvatar>
      <CardAvatar>
      <Tag tagColor="green">AUTHORED BY</Tag>

        {linkedParsedContent?.authorAddress ? (
          <AuthorAvatar address={linkedParsedContent?.authorAddress} />
        ) : (
          <AuthorAvatar address={ZERO_ADDRESS} />
        )}
      </CardAvatar>

      {(parsedContent?.tag == "DUCEREF" || (parsedContent?.tag == "DUCE" && parsedContent?.parentId == "0")) && (<CardTitleWrapper>
        <Link to={`${getArticleUrl(linkedParsedContent.daoId, linkedParsedContent.id, daoChain)}/comments`}><CardTitle>{linkedParsedContent?.title}</CardTitle></Link>
        <Tooltip key={parsedContent?.id} content={`tip`} triggerEl={(<CollectButton hash={parsedContent?.id} link={true} />)} />
      </CardTitleWrapper>)}

      <CardDescription>{linkedParsedContent?.content}</CardDescription>
      <ParSm><StyledExternalLink href={linkedParsedContent?.contentURI} target="_blank">Link to OP</StyledExternalLink></ParSm>
      <Tags>{linkedParsedContent?.tags?.map((tag, key) => {
        return (
          <Tag key={key} tagColor="violet">{tag}</Tag>
        )
      }
      )

      }</Tags>
      <ArticleLinks>
        {(!parsedContent?.parentId || parsedContent?.parentId === "0") && (<StyledLink to={getArticleUrl(parsedContent.daoId, parsedContent.id, daoChain)}> detail</StyledLink>)}
        {(!parsedContent?.parentId || parsedContent?.parentId === "0") && (<StyledLink to={`${getArticleUrl(parsedContent.daoId, parsedContent.id, daoChain)}/comments`}> comments <Comments hash={parsedContent?.id} badge /> </StyledLink>)}
        {parsedContent?.parentId && parsedContent?.parentId != "0" && (
          <StyledLink to={`/molochv3/${daoChain}/${parsedContent.daoId}/rarticles/${parsedContent.parentId}`}> See parent ↩
          </StyledLink>
        )}

        <StyledLink to={``}> created at: {formattedDate} </StyledLink>



      </ArticleLinks>


    </ArticleCard>
  );
};
