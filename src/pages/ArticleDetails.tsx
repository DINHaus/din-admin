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

const ShareLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
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
    recordType: "DUCE",
    hash,
  });

  if (!records) {
    return <div>Loading...</div>;
  }

  console.log("records *****************>>", records);

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
        {parsedContent?.createdAt && (<StyledLink to={``}> created at: {new Date(Number(parsedContent.createdAt) * 1000).toString()} </StyledLink>)}

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
        <Button variant="outline" size="sm">
          <StyledLink to={"comments"}> Comments <Comments badge hash={hash} /></StyledLink>
        </Button>
        <DownloadButton textOutput={parsedContent?.content} id={hash} />
        <Dialog >
          <DialogTrigger asChild>
            <Button
              variant={'outline'}
              size="sm"
            >
              Share
            </Button>
          </DialogTrigger>

          <DialogContent
            title="Share"
          >
            <DialogContentWrapper>
              <ParMd>{parsedContent?.title}</ParMd>
              <ShareLinks>
                <svg width="42" height="42" viewBox="0 0 1260 1260" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_2)"><path d="M947.747 1259.61H311.861C139.901 1259.61 0 1119.72 0 947.752V311.871C0 139.907 139.901 0.00541362 311.861 0.00541362H947.747C1119.71 0.00541362 1259.61 139.907 1259.61 311.871V947.752C1259.61 1119.72 1119.71 1259.61 947.747 1259.61Z" fill="#472A91"></path><path d="M826.513 398.633L764.404 631.889L702.093 398.633H558.697L495.789 633.607L433.087 398.633H269.764L421.528 914.36H562.431L629.807 674.876L697.181 914.36H838.388L989.819 398.633H826.513Z" fill="white"></path></g><defs><clipPath id="clip0_1_2"><rect width="1259.61" height="1259.61" fill="white"></rect></clipPath></defs></svg>
                <svg width="32" height="32" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="white" />
                </svg>
                <svg width="54" height="42" viewBox="0 0 40 26" fill="green" xmlns="http://www.w3.org/2000/svg"><path d="M26.7277 8.31968C26.575 8.47469 26.3237 8.36854 26.3237 8.15105C26.3237 7.95254 26.3237 7.73361 26.3144 7.52694C26.0793 -1.05716 13.2302 -1.05716 12.9952 7.52694C12.9898 7.73361 12.9871 7.94166 12.9871 8.15105C12.9871 8.36104 12.732 8.46798 12.5833 8.31968C12.4375 8.17417 12.2862 8.02597 12.1376 7.88455C5.93731 1.98188 -3.14242 11.1371 2.71896 17.3661C2.86121 17.5165 3.00572 17.6661 3.15247 17.8148C10.2247 24.9352 19.6532 24.9359 19.6548 24.9359C19.6547 24.9359 19.6548 24.9359 19.6548 24.9359C19.6564 24.9359 29.0863 24.9352 36.1584 17.8148C36.3061 17.667 36.4507 17.5175 36.592 17.3661C42.4534 11.1303 33.3682 1.98188 27.1733 7.88455C27.0233 8.02597 26.8708 8.17146 26.7277 8.31968Z" fill="#090909"></path><path d="M19.6548 24.9359C19.6532 24.9359 10.2247 24.9352 3.15247 17.8148C3.00572 17.6661 2.86121 17.5165 2.71896 17.3661C-3.14242 11.1371 5.93731 1.98188 12.1376 7.88455C12.2862 8.02597 12.4375 8.17417 12.5833 8.31968C12.732 8.46798 12.9871 8.36104 12.9871 8.15105C12.9871 7.94166 12.9898 7.73362 12.9952 7.52694C13.2302 -1.05716 26.0793 -1.05716 26.3144 7.52694C26.3237 7.73362 26.3237 7.95254 26.3237 8.15105C26.3237 8.36854 26.575 8.47469 26.7277 8.31968C26.8708 8.17146 27.0233 8.02597 27.1733 7.88455C33.3682 1.98188 42.4534 11.1303 36.592 17.3661C36.4507 17.5175 36.3061 17.667 36.1584 17.8148C29.0863 24.9352 19.6564 24.9359 19.6548 24.9359ZM19.6548 24.9359C19.6547 24.9359 19.6548 24.9359 19.6548 24.9359Z" stroke="#090909" stroke-width="1.65845" stroke-miterlimit="10"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M25.1176 14.7762C24.9168 14.7762 24.8481 15.0693 24.9761 15.2239C25.201 15.4953 25.3363 15.8447 25.3363 16.2259C25.3363 17.0902 24.6403 17.7909 23.7818 17.7909C22.9234 17.7909 22.2273 17.0902 22.2273 16.2259C22.2273 16.178 22.1652 16.1541 22.1372 16.1929C21.8936 16.5314 21.7291 16.9111 21.6616 17.3096C21.6237 17.5336 21.4429 17.7191 21.2156 17.7191H21.0876C20.7897 17.7191 20.5438 17.4759 20.5878 17.1812C20.8893 15.1619 22.866 13.6973 25.1176 13.6973C27.3691 13.6973 29.346 15.1619 29.6474 17.1812C29.6913 17.4759 29.4456 17.7191 29.1475 17.7191C28.8497 17.7191 28.6137 17.4747 28.5491 17.1839C28.2543 15.8602 26.8881 14.7762 25.1176 14.7762ZM11.3139 16.2259C11.3139 16.1624 11.232 16.1281 11.1937 16.1787C10.9336 16.5223 10.7565 16.911 10.6817 17.3206C10.6376 17.5618 10.4428 17.7621 10.1976 17.7621H10.1021C9.80413 17.7621 9.55834 17.5189 9.60227 17.2242C9.90358 15.2038 11.8806 13.7403 14.1321 13.7403C16.3836 13.7403 18.3606 15.2038 18.6619 17.2242C18.7059 17.5189 18.4601 17.7621 18.1621 17.7621C17.8642 17.7621 17.6282 17.5177 17.5636 17.2269C17.269 15.9025 15.9028 14.8193 14.1321 14.8193C13.9684 14.8193 13.9092 15.0519 14.0189 15.1734C14.2699 15.4513 14.4229 15.8206 14.4229 16.2259C14.4229 17.0902 13.7269 17.7909 12.8684 17.7909C12.0099 17.7909 11.3139 17.0902 11.3139 16.2259ZM22.182 19.8297C21.9206 19.6869 21.5951 19.7893 21.3846 20.0001C20.9786 20.4064 20.3633 20.684 19.6511 20.684C18.9371 20.684 18.3224 20.4092 17.9174 20.0026C17.7071 19.7915 17.3822 19.6878 17.1202 19.8297C16.8582 19.9716 16.7578 20.303 16.9456 20.5344C17.5601 21.2916 18.5559 21.7629 19.6511 21.7629C20.747 21.7629 21.7405 21.2866 22.3543 20.535C22.5426 20.3042 22.4436 19.9726 22.182 19.8297Z" fill="white"></path></svg>

              </ShareLinks>
            </DialogContentWrapper>
          </DialogContent>
        </Dialog>
      </ArticleLinks>
    </ArticleLayout>
  );
};

const DownloadButton = ({ textOutput, id }: { textOutput: string, id: string }) => {
  const file = new Blob([textOutput], { type: 'text/plain' });

  return (
    <Button variant="outline" size="sm">
      <a download={`din-${id}.txt`} target="_blank" rel="noreferrer" href={URL.createObjectURL(file)} style={{
        textDecoration: "inherit",
        color: "inherit",
      }}>Export</a>
    </Button>
  )
}