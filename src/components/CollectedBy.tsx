import React, { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { ParMd, ProfileAvatar, Tooltip } from '@daohaus/ui';
import {  useShamanTokenId } from '../hooks/useShamanTokenId';
import { EthAddress, truncateAddress } from '@daohaus/utils';
import { useCurrentDao } from '@daohaus/moloch-v3-hooks';


const AvatarGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const CollectedBy = ({
    shamanAddress,
    hash

}: {
    shamanAddress: EthAddress,
    hash: string
}) => {
    const {daoChain} = useCurrentDao();
    

    const {parentId, childs} = useShamanTokenId({shamanAddress, hash, chainId: daoChain});
    console.log("things", parentId, childs);

return (
    <AvatarGroup>
        <>
        <ParMd>{`id:${parentId} Collected By:`}</ParMd>

        {childs && Array.isArray(childs) && childs.length > 0 && childs.map((child, key) => {
                return (
                        <Tooltip key={key} content={truncateAddress(child?.owner)} triggerEl={(<ProfileAvatar size='sm' address={child.owner} />)} />

                )
        
        })}
        </>
    </AvatarGroup>
);
};
