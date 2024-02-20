import React, { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Button, ParMd, ParSm, ProfileAvatar, Tooltip } from '@daohaus/ui';
import { TokenChild, useShamanTokenId } from '../hooks/useShamanTokenId';
import { EthAddress, truncateAddress } from '@daohaus/utils';
import { useDHConnect } from '@daohaus/connect';
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

        {childs && Array.isArray(childs) && childs.length > 0 && childs.map((child) => {
                return (
                        <Tooltip content={truncateAddress(child?.owner)} triggerEl={<ProfileAvatar size='sm' address={child.owner} />}>
                        
                        </Tooltip>

                )
        
        })}
        </>
    </AvatarGroup>
);
};
