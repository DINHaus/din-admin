import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
  H1,
  ParMd,
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

import { useState } from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { useRecords } from "../hooks/useRecords";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { useShamanNFT } from "../hooks/useShamanNFT";
import { CollectedBy } from "../components/CollectedBy";
import { Comments } from "./Comments";
import { CollectButton } from "../components/CollectButton";
import { BlogPost } from "../utils/types";
import { ArticleLinks, StyledLink } from "../utils/listStyles";


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

export const ArticleDetails = () => {
  //   const location = useLocation(); // for share link


  const { hash } = useParams();

  const { daoChain, daoId } = useCurrentDao();
  const { dao } = useDaoData();


  if (!daoId || !daoChain || !hash) {
    return null;
  }
  const { shamanName, shamanAddress, sdata, isLoading: isShamanLoading } = useShamanNFT({ dao: dao, chainId: daoChain });
  // console.log("shaman >>>", sdata, shamanAddress, shamanName, isShamanLoading);
  const { records } = useRecords({
    daoId: daoId,
    chainId: daoChain,
    recordType: "DIN",
    hash,
  });

  if (!records) {
    return <div>Loading...</div>;
  }

  if (!shamanAddress) {
    return null;
  }

  const parsedContent: BlogPost = records[0]?.parsedContent as BlogPost;


  return (
    <ArticleLayout>
      {/* <HeaderImageWrapper>
        <HeaderImage
          src={
            parsedContent?.imageURI ||
            "https://hackmd.io/_uploads/rkWi13-ba.png"
          }
        />
      </HeaderImageWrapper> */}
      <TitleWrapper>
        <H1>{parsedContent?.title}</H1>
        <StyledLink to={``}> created at: {new Date(Number(parsedContent.createdAt) * 1000).toString()} </StyledLink>

      </TitleWrapper>

      {parsedContent?.authorAddress ? (
        <AuthorAvatar address={parsedContent?.authorAddress} />
      ) : (
        <AuthorAvatar address={ZERO_ADDRESS} />
      )}

      <ReactMarkdownWrapper><ReactMarkdown>{parsedContent?.content}</ReactMarkdown></ReactMarkdownWrapper>
      {shamanAddress && hash && <CollectedBy hash={hash} />}
      <ArticleLinks>
        {sdata?._price.result && sdata?._authorFee.result && hash && <CollectButton hash={hash} link={false} />}
        <Button variant="outline">
          <StyledLink to={"comments"}> Comments <Comments badge hash={hash} /></StyledLink>
        </Button>
      </ArticleLinks>
    </ArticleLayout>
  );
};
