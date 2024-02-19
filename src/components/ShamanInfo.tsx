import React from 'react';

import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { useShamanNFT } from '../hooks/useShamanNFT';
import { Card, ParSm } from '@daohaus/ui';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { ValidNetwork } from '@daohaus/keychain-utils';


export const ShamanInfo = ({dao, daoChain}: {dao:MolochV3Dao, daoChain: ValidNetwork}) => {
    // const { daoChain, daoId } = useCurrentDao();
    // const { dao } = useDaoData();
    const { shamanName, shamanAddress, sdata, isLoading: isShamanLoading } = useShamanNFT({ dao: dao, chainId: daoChain });
    console.log("shaman", sdata, shamanAddress, shamanName, isShamanLoading);

    if (isShamanLoading) {
        return <div>Loading...</div>;
    }

    return shamanAddress && shamanName && (<Card>
        <ParSm>Shaman Address: {shamanAddress.toString()}</ParSm>
        <ParSm>Shaman Name: {shamanName}</ParSm>
        {/* <ParSm>Author Fee: {sdata._authorFee.toString()}</ParSm>
        <ParSm>Price: {sdata._price.toString()}</ParSm>
        <ParSm>Collector Loot: {sdata._collectorLoot.toString()}</ParSm>
        <ParSm>Creator Shares: {sdata.creatorShares.toString()}</ParSm> */}
    </Card>)

}

