
import React from 'react';

import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { useShamanNFT } from '../hooks/useShamanNFT';
import { Card, ParSm } from '@daohaus/ui';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress } from '@daohaus/utils';
import { useShamanNFTbyMember } from '../hooks/useShamanNFTbyMember';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BookMarkWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
`;

export const MemberNFts = ({ dao, daoChain, memberAddress }: { dao: MolochV3Dao, daoChain: ValidNetwork, memberAddress: EthAddress }) => {

    const { shamanName, shamanAddress, sdata, isLoading: isShamanLoading } = useShamanNFT({ dao: dao, chainId: daoChain });

    if (!shamanAddress || !memberAddress || isShamanLoading) {
        return null;
    }

    const { tokens, balance } = useShamanNFTbyMember({ shamanAddress: shamanAddress, memberAddress: memberAddress, chainId: daoChain });
    console.log("data", tokens, balance);

    if (!tokens || !balance) {
        return <div>Loading bookmarks...</div>;
    }


    return (
        <>
            {/* <Card>
                <ParSm>Shaman Address: {shamanAddress.toString()}</ParSm>
                <ParSm>Shaman Name: {shamanName}</ParSm>
                <ParSm>Balance: {Number(balance)}</ParSm>
            </Card> */}
            <ParSm>Bookmarks:</ParSm>
            <BookMarkWrapper>

                {tokens && tokens.map((token, key) => {
                    return (
                        <Link to={`/molochv3/${daoChain}/${dao.id}/articles/${token.hash}/comments`}><Card key={key}>
                            {/* <ParSm>{`Token meata base64: ${token.token}`}</ParSm> */}
                            <ParSm>{`TokenId: ${token.tokenId}`}</ParSm>
                            {/* <ParSm>{`parentId: ${token.parentId}`}</ParSm> */}

                            {Number(token.parentId) === 0 ? (<ParSm>{`Author`}</ParSm>) : (<ParSm>{`Collector`}</ParSm>)}
                        </Card></Link>
                    )
                })}

            </BookMarkWrapper>
        </>
    )

}
