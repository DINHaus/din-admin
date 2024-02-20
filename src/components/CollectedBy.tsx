import React, { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Button, ParMd } from '@daohaus/ui';
import { useShamanTokenId } from '../hooks/useShamanTokenId';
import { EthAddress } from '@daohaus/utils';


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

    const {parentId, childs} = useShamanTokenId({shamanAddress, hash});
    console.log(parentId, childs);

  return (
    <AvatarGroup>
    {/* stubbed out, can get from nft */}
    <ParMd>Collected By:</ParMd>
    <Avatar size="sm"></Avatar>
    <Avatar size="sm"></Avatar>
    <Avatar size="sm"></Avatar>
  </AvatarGroup>
  );
};
