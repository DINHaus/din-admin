import React from 'react';
import { H1, LinkStyles, ParLg, SingleColumnLayout } from '@daohaus/ui';
import styled from 'styled-components';

const StyledExternalLink = styled.a`
  ${LinkStyles};
`;

const Support: React.FC = () => {
    return (
        <SingleColumnLayout>
            <H1>Support</H1>
            <ParLg>
                If you have any questions there is a DIN DEV topic to post feedback/questions and find articles and videos.

            </ParLg>
            <ParLg>
                <StyledExternalLink href={"https://dinhaus.github.io/din-admin/#/molochv3/0xa/0xa0c536c4696f880cd61fc227662d8008893ab822/articles/0xf0c696f7dd7dc1700c1f4ec0f60151f362cd0fef2dca2bbe6f5153034363a8db"} target="_blank">
                    Getting Started
                </StyledExternalLink>
            </ParLg>
            <ParLg>
                <StyledExternalLink href={"https://dinhaus.github.io/din-admin/#/molochv3/0xa/0xa0c536c4696f880cd61fc227662d8008893ab822/articles"} target="_blank">
                    DIN DEV Feed
                </StyledExternalLink>
            </ParLg>

        </SingleColumnLayout>
    );
};

export default Support;