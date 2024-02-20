import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { TARGET_DAO } from "../targetDao";
import { useParams } from "react-router-dom";
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

import { APP_TX } from "../legos/tx";
import { useState } from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { useRecords } from "../hooks/useRecords";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { useShamanNFT } from "../hooks/useShamanNFT";
import { CollectedBy } from "../components/CollectedBy";

type BlogPost = {
  title: string;
  description: string;
  contentURI: string;
  imageURI: string;
  authorAddress: string;
  contentHash: string;
};

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

export const ArticleDetails = () => {
  //   const location = useLocation(); // for share link
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [isSuccessTx, setIsSuccessTx] = useState(false);

  const { hash } = useParams();
  const { address } = useDHConnect();
  const { fireTransaction } = useTxBuilder();
  const { daoChain, daoId } = useCurrentDao();
  const { dao } = useDaoData();


  if (!daoId || !daoChain) {
    return null;
  }
  const { shamanName, shamanAddress, sdata, isLoading: isShamanLoading } = useShamanNFT({ dao: dao, chainId: daoChain });
  console.log("shaman >>>", sdata, shamanAddress, shamanName, isShamanLoading);
  const { records } = useRecords({
    daoId: daoId,
    chainId: daoChain,
    recordType: "DIN",
    hash,
  });
  const { successToast, errorToast, defaultToast } = useToast();

  if (!records) {
    return <div>Loading...</div>;
  }

  if(!shamanAddress){
    return null;
  }

  const parsedContent: BlogPost = records[0]?.parsedContent as BlogPost;

  const handleCollect = () => {
    if (!address) {
      return;
    }

    fireTransaction({
      tx: {
        ...APP_TX.COLLECT,
        staticOverrides: {
          value: BigInt(sdata?._price.result || 0),
        },
      } as TXLego,
      callerState: {
        postId: hash,
      },
      lifeCycleFns: {
        onRequestSign() {
          setIsLoadingTx(true);
          setIsSuccessTx(false);
          defaultToast({
            title: "Success",
            description: "Transaction submitted: Wating",
          });
        },
        onTxSuccess() {
          setIsLoadingTx(false);
          setIsSuccessTx(true);
          successToast({ title: "Success", description: "Minted" });
        },
        onTxError(err) {
          const errMsg = handleErrorMessage(
            err as { error: unknown; fallback?: string | undefined }
          );
          console.error(err);
          errorToast({ title: "Error", description: errMsg });
          setIsLoadingTx(false);
        },
      },
    });
  };

  return (
    <ArticleLayout>
      <HeaderImageWrapper>
        <HeaderImage
          src={
            parsedContent?.imageURI ||
            "https://hackmd.io/_uploads/rkWi13-ba.png"
          }
        />
      </HeaderImageWrapper>
      <TitleWrapper>
        <H1>{parsedContent?.title}</H1>
      </TitleWrapper>

      {parsedContent?.authorAddress ? (
        <AuthorAvatar address={parsedContent?.authorAddress} />
      ) : (
        <AuthorAvatar address={ZERO_ADDRESS} />
      )}

      <ReactMarkdown>{parsedContent?.description}</ReactMarkdown>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Collect</Button>
        </DialogTrigger>
        <DialogContent
          title="Collect"
          rightButton={{
            onClick: handleCollect,
            disabled: !!isLoadingTx,
            children: "Collect",
          }}
        >
          <DialogContentWrapper>
            {!address ? (
              <ParMd>Connect to collect</ParMd>
            ) : (
              <>
                <Card>
                  <SmallCardImg
                    src={
                      parsedContent?.imageURI
                    } />
                  <ParMd>{parsedContent?.title}</ParMd>
                </Card>
                <ParMd>Mint and collect this article</ParMd>
                <ParMd>
                  Price will be{" "}
                  {formatValueTo({
                    value: fromWei(sdata?._price.result || "0"),
                    decimals: 6,
                    format: "number",
                  })}{" "}ETH
                  
                </ParMd>
                {sdata?._authorFee.result ?
                  (<ParMd>{100 / Number(sdata?._authorFee.result)}% goes to the author and {100 - (100 / Number(sdata?._authorFee.result))}% to the DAO</ParMd>)
                  :
                  (<ParMd>split between author and DAO</ParMd>)}
                {isLoadingTx && (
                  <ParMd>
                    <Spinner /> Waiting for transaction
                  </ParMd>
                )}
                {isSuccessTx && (
                  <SuccessText>Success! Thank you for your support</SuccessText>
                )}
              </>
            )}
          </DialogContentWrapper>
        </DialogContent>
      </Dialog>
      <>
        {false && hash && <CollectedBy shamanAddress={shamanAddress as EthAddress} hash={hash} />}
      </>
    </ArticleLayout>
  );
};
