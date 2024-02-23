
import React from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { ParMd, Tooltip } from "@daohaus/ui";
import { ArticleCard, ArticleLinks, CardAvatar, CardDescription, CardTitle, CardTitleWrapper, StyledLink } from "../utils/listStyles";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { Link } from "react-router-dom";
import { CollectButton } from "../components/CollectButton";
import { Comments } from "./Comments";
import { ZERO_ADDRESS } from "@daohaus/utils";
import { BlogPost } from "../utils/types";
import { DEFAULT_NETWORK_ID } from "../utils/constants";


export const ArticleListItem = ({parsedContent}:{parsedContent: BlogPost}) => {

  const getArticleUrl = (daoId: string, articleId: string, daoChain?: string) => {
    return `/molochv3/${daoChain || DEFAULT_NETWORK_ID}/${daoId}/articles/${articleId}`
  }

  if(!parsedContent.id || !parsedContent.daoId || !parsedContent.content) {
    return <ParMd>Invalid Metadata Format</ParMd>
  }

  return (
    <ArticleCard>
              {/* <CardImg>
                <Link to={parsedContent?.id}>
                  <img
                    src={
                      parsedContent?.imageURI ||
                      "https://hackmd.io/_uploads/rkWi13-ba.png"
                    }
                  />
                </Link>
              </CardImg> */}
              <CardAvatar>


                {parsedContent?.authorAddress ? (
                  <AuthorAvatar address={parsedContent?.authorAddress} />
                ) : (
                  <AuthorAvatar address={ZERO_ADDRESS} />
                )}
              </CardAvatar>
              <CardTitleWrapper>
                <Link to={`${getArticleUrl(parsedContent.daoId, parsedContent.id)}/comments`}><CardTitle>{parsedContent?.title}</CardTitle></Link> 
                <Tooltip key={parsedContent?.id} content={`updoot & collect`} triggerEl={(<CollectButton hash={parsedContent?.id} link={true} />)} />
              </CardTitleWrapper>
              <CardDescription>{parsedContent?.content}</CardDescription>
              <ParMd>{parsedContent?.contentURI}</ParMd>
              <ArticleLinks>
                <StyledLink to={getArticleUrl(parsedContent.daoId, parsedContent.id)}> detail</StyledLink>
                <StyledLink to={`${getArticleUrl(parsedContent.daoId, parsedContent.id)}/comments`}> comments <Comments hash={parsedContent?.id} badge /> </StyledLink>
                <StyledLink to={``}> created at: {new Date(Number(parsedContent.createdAt) * 1000).toString()} </StyledLink>

              </ArticleLinks>


            </ArticleCard>
  );
};
