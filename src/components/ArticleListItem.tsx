import React, { useState } from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  LinkStyles,
  ParLg,
  ParMd,
  ParSm,
  Tag,
  Tooltip,
} from "@daohaus/ui";
import {
  ArticleCard,
  ArticleLinks,
  CardAvatar,
  CardDescription,
  CardTitle,
  CardTitleWrapper,
  StyledLink,
} from "../utils/listStyles";
import { AuthorAvatar } from "./AuthorAvatar";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CollectButton } from "./CollectButton";
import { Comments } from "../pages/Comments";
import { ZERO_ADDRESS } from "@daohaus/utils";
import { BlogPost } from "../utils/types";
import { DEFAULT_NETWORK_ID } from "../utils/constants";
import styled from "styled-components";

const Tags = styled.div`
  display: flex;

  .article-tag {
    margin: 0.5rem;
  }
`;
const DialogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const StyledExternalLink = styled.a`
  ${LinkStyles};
`;

export const ArticleListItem = ({
  parsedContent,
}: {
  parsedContent: BlogPost;
}) => {
  const { daoChain } = useParams();
  const navigate = useNavigate();
  const [curateFormLink, setCurateFormLink] = useState<string | null>(null);

  const getArticleUrl = (
    daoId: string,
    articleId: string,
    daoChain?: string
  ) => {
    return `/molochv3/${
      daoChain || DEFAULT_NETWORK_ID
    }/${daoId}/articles/${articleId}`;
  };

  const getCurateUrl = (
    daoId: string,
    relatedArticle: string,
    daoChain?: string
  ) => {
    return `/molochv3/${
      daoChain || DEFAULT_NETWORK_ID
    }/${daoId}/curate/${daoId}/${relatedArticle}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: validate DAO
    const link = getCurateUrl(
      event.target.value,
      parsedContent.recordId,
      daoChain
    );
    console.log(event, link);
    setCurateFormLink(link);
  };

  const handleClick = () => {
    if (!curateFormLink) return;
    navigate(curateFormLink);
  };

  if (!parsedContent.id || !parsedContent.daoId || !parsedContent.content) {
    return <ParMd>Invalid Metadata Format</ParMd>;
  }

  console.log("parsedContent *****************>>", parsedContent);
  const date = new Date(Number(parsedContent.createdAt) * 1000);
  const formattedDate = `${date.getFullYear()} ${date.toLocaleString(
    "default",
    { month: "short" }
  )} ${date.getDate()} ${date.getHours()}:${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()}`;

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
      {(parsedContent?.tag == "DUCEREF" ||
        (parsedContent?.tag == "DUCE" && parsedContent?.parentId == "0")) && (
        <CardTitleWrapper>
          <Link
            to={`${getArticleUrl(
              parsedContent.daoId,
              parsedContent.id,
              daoChain
            )}/comments`}
          >
            <CardTitle>{parsedContent?.title}</CardTitle>
          </Link>
          <Tooltip
            key={parsedContent?.id}
            content={`tip`}
            triggerEl={<CollectButton hash={parsedContent?.id} link={true} />}
          />
        </CardTitleWrapper>
      )}

      <CardDescription>{parsedContent?.content}</CardDescription>
      {parsedContent?.contentURI && (
        <ParSm>
          <StyledExternalLink href={parsedContent?.contentURI} target="_blank">
            external link
          </StyledExternalLink>
        </ParSm>
      )}
      <Tags>
        {parsedContent?.tags?.map((tag, key) => {
          const tagObj = tag as unknown as {label: string, value: string};
          return (
            <Tag className="article-tag" key={key} tagColor="violet">
              {tagObj.label}
            </Tag>
          );
        }) || []}
      </Tags>
      <ArticleLinks>
        {(!parsedContent?.parentId || parsedContent?.parentId === "0") && (
          <StyledLink
            to={getArticleUrl(parsedContent.daoId, parsedContent.id, daoChain)}
          >
            detail
          </StyledLink>
        )}
        {(!parsedContent?.parentId || parsedContent?.parentId === "0") && (
          <StyledLink
            to={`${getArticleUrl(
              parsedContent.daoId,
              parsedContent.id,
              daoChain
            )}/comments`}
          >
            comments <Comments hash={parsedContent?.id} badge />{" "}
          </StyledLink>
        )}
        {parsedContent?.parentId && parsedContent?.parentId != "0" && (
          <StyledLink
            to={getArticleUrl(
              parsedContent.daoId,
              parsedContent.parentId,
              daoChain
            )}
          >
            See parent ↩
          </StyledLink>
        )}

        <StyledLink to={`#`} isdead="true">
          created at: {formattedDate}
        </StyledLink>
        {(!parsedContent?.parentId || parsedContent?.parentId === "0") && (
          <Dialog>
            <DialogTrigger asChild>
              <StyledLink to={``}> Submit for curation </StyledLink>
            </DialogTrigger>
            <DialogContent
              title="Submit for curation to Topic Hub"
              rightButton={{
                children: "Submit for curation",
              }}
              onClick={handleClick}
            >
              <DialogContentWrapper>
                <ParSm>
                  Enter the Hub Id to submit to the editors for curation
                </ParSm>
                <Input
                  long
                  id="daoAddress"
                  placeholder="DAO Address"
                  onChange={handleChange}
                ></Input>
              </DialogContentWrapper>
            </DialogContent>
          </Dialog>
        )}
      </ArticleLinks>
    </ArticleCard>
  );
};
