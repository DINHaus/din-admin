import { useDHConnect } from "@daohaus/connect";
import { useTxBuilder } from "@daohaus/tx-builder";
import { Button, Card, Dialog, DialogContent, DialogTrigger, ParMd, Spinner, SuccessText, useToast } from "@daohaus/ui";
import { TXLego, formatValueTo, fromWei, handleErrorMessage } from "@daohaus/utils";
import styled from "styled-components";
import { APP_TX } from "../legos/tx";
import { useState } from "react";
import { useShamanNFT } from "../hooks/useShamanNFT";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { useRecords } from "../hooks/useRecords";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { BlogPost } from "../utils/types";
import { CollectedBy } from "./CollectedBy";

const DialogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CollectButton = ({ hash, link }: { hash: string, link: boolean }) => {
    const { address } = useDHConnect();
    const { daoChain, daoId } = useCurrentDao();
    const { dao } = useDaoData();
    const { fireTransaction } = useTxBuilder();
    const { successToast, errorToast, defaultToast } = useToast();
    const [isLoadingTx, setIsLoadingTx] = useState(false);
    const [isSuccessTx, setIsSuccessTx] = useState(false);

    if (!daoId || !daoChain) {
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

    const price = sdata?._price.result;
    const authorFee = sdata?._authorFee.result;
    const parsedContent: BlogPost = records[0]?.parsedContent as BlogPost;

    const handleCollect = () => {
        if (!address) {
            return;
        }

        fireTransaction({
            tx: {
                ...APP_TX.COLLECT,
                staticOverrides: {
                    value: BigInt(price || 0),
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
        <Dialog>
            <DialogTrigger asChild>
                {!link ? (
                    <Button variant="outline">Collect</Button>
                ) : (
                    <Button variant="link" size="sm"><IoMdArrowDropupCircle /><CollectedBy hash={hash} badge /></Button>
                    )}
                
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
                                {/* <SmallCardImg
                    src={
                      parsedContent?.imageURI
                    } /> */}
                                <ParMd>{parsedContent?.title}</ParMd>
                            </Card>
                            <ParMd>Mint and collect this article</ParMd>
                            <ParMd>
                                Price will be{" "}
                                {formatValueTo({
                                    value: fromWei(price || "0"),
                                    decimals: 6,
                                    format: "number",
                                })}{" "}ETH

                            </ParMd>
                            {authorFee ?
                                (<ParMd>{100 / Number(authorFee)}% goes to the author and {100 - (100 / Number(authorFee))}% to the DAO</ParMd>)
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
    );
};
