
import React from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { ParMd, Tooltip } from "@daohaus/ui";
import { ArticleCard, ArticleLinks, CardAvatar, CardDescription, CardTitle, CardTitleWrapper, StyledLink } from "../utils/listStyles";
import { AuthorAvatar } from "./AuthorAvatar";
import { Link } from "react-router-dom";
import { CollectButton } from "./CollectButton";
import { Comments } from "../pages/Comments";
import { ZERO_ADDRESS } from "@daohaus/utils";
import { BlogPost } from "../utils/types";
import { DEFAULT_NETWORK_ID } from "../utils/constants";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";


export const DraftListItem = ({parsedContent, createdAt, dao, daoChain, memberAddress}:
  {parsedContent: BlogPost, 
    createdAt: string,
    dao: MolochV3Dao,
    daoChain: string,
    memberAddress: string
  }) => {
console.log("p>>>>>>>>>>>> parsedContent", parsedContent)
  const getArticleUrl = (daoId: string, articleId: string, daoChain?: string) => {
    return `/molochv3/${daoChain || DEFAULT_NETWORK_ID}/${daoId}/articles/${articleId}`
  }

  if(!parsedContent.content) {
    return <ParMd>Invalid Metadata Format</ParMd>
  }

  console.log(parsedContent)

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


                {memberAddress ? (
                  <AuthorAvatar address={memberAddress} />
                ) : (
                  <AuthorAvatar address={ZERO_ADDRESS} />
                )}
              </CardAvatar>
              <CardTitleWrapper>
                <Link to={`/molochv3/${daoChain}/${dao.id}/edit/${createdAt}`}><CardTitle>{parsedContent?.title}</CardTitle></Link> 
              </CardTitleWrapper>
              <CardDescription>{parsedContent?.content}</CardDescription>
              <ParMd>{parsedContent?.contentURI}</ParMd>
              <ArticleLinks>
                <StyledLink to={`/molochv3/${daoChain}/${dao.id}/edit/${createdAt}`}> created at: {new Date(Number(createdAt) * 1000).toString()} </StyledLink>
              </ArticleLinks>


            </ArticleCard>
  );
};
