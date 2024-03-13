
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
import { ArticleListItem } from './ArticleListItem';
import { CardWrapper } from '../utils/listStyles';
import { DraftListItem } from './DraftListItem';


export const LocalDrafts = ({ dao, daoChain, memberAddress }: { dao: MolochV3Dao, daoChain: ValidNetwork, memberAddress: EthAddress }) => {

    const drafts = localStorage.getItem("drafts") || "{}" as string;
    const parsedDrafts = JSON.parse(drafts);

    return (
        <>
            <ParSm>Local Drafts:</ParSm>
            <CardWrapper>
                {Object.keys(parsedDrafts).map((key, index) => {
                    return (
                        <DraftListItem dao={dao} daoChain={daoChain} memberAddress={memberAddress} parsedContent={parsedDrafts[key]} createdAt={key} key={key} />
                    )
                })}
            </CardWrapper>
        </>
    )

}
