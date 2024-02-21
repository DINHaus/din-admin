import React, { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { ParMd, ProfileAvatar, Tooltip } from '@daohaus/ui';
import {  useShamanTokenId } from '../hooks/useShamanTokenId';
import { EthAddress, truncateAddress } from '@daohaus/utils';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { useShamanNFT } from '../hooks/useShamanNFT';


const AvatarGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const CollectedBy = ({
    hash,
    badge

}: {
    hash: string
    badge?: boolean
}) => {
    const {daoChain} = useCurrentDao();
    const { dao } = useDaoData();

    const { shamanName, shamanAddress, sdata, isLoading: isShamanLoading } = useShamanNFT({ dao: dao, chainId: daoChain });

    if (!shamanAddress) {
        return null;
    }
    

    const {parentId, childs} = useShamanTokenId({shamanAddress, hash, chainId: daoChain});
    // console.log("things", parentId, childs);

    if(badge) {
        return `(${childs && Array.isArray(childs) && childs.length})`
    }

return (
    <AvatarGroup>
        <>
        {childs && Array.isArray(childs) && childs.length > 0 ? (<ParMd>{`id:${parentId} (${childs.length}) Collected By:`}</ParMd>) : (<ParMd>{`Not collected yet`}</ParMd>)}

        {childs && Array.isArray(childs) && childs.length > 0 && childs.map((child, key) => {
                return (
                        <Tooltip key={key} content={truncateAddress(child?.owner)} triggerEl={(<ProfileAvatar size='sm' address={child.owner} />)} />

                )
        
        })}
        </>
    </AvatarGroup>
);
};
