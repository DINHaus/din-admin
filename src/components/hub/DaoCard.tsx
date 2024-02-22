import styled from "styled-components";

import { charLimit, readableNumbers } from "@daohaus/utils";
import { getNetworkName } from "@daohaus/keychain-utils";
import { MolochV3Membership } from "@daohaus/utils";
import {
  Badge,
  Bold,
  ParLg,
  ParMd,
  ParSm,
  ProfileAvatar,
  Tag,
  Tooltip,
} from "@daohaus/ui";
import { ButtonRouterLink } from "../ButtonRouterLink";
import { ListDaosQueryResDaos } from "@daohaus/moloch-v3-data";
import { useDHConnect } from "@daohaus/connect";
import ReactMarkdown from "react-markdown";
import { DEFAULT_NETWORK_ID } from "../../utils/constants";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledDaoCard = styled.div`
  background-color: ${(props) => props.theme.secondary.step2};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  // max-width: 34rem;
  min-width: 26rem;
  border: 1px solid ${(props) => props.theme.secondary.step5};
  padding: 1rem;
  border-radius: ${(props) => props.theme.card.radius};
  .top-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

  }
  .top-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.3rem;
  }

  .badge {
    transform: translateX(-0.8rem);
  }
  .stats-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.4rem;
    p {
      margin-bottom: 0.6rem;
    }
  }
  .tag-box {
    font-size: 1.4rem;
    margin-bottom: 2.4rem;
    div {
      margin-right: 1.5rem;
    }
  }
  .button-box {
    display: flex;
    flex-direction: row;
  }
  
`;

export const DaoCard = ({
  id,
  activeMemberCount,
  activeProposals,
  proposalCount,
  name,
  avatarImg,
  description,
  tags,
}: ListDaosQueryResDaos[0]) => {
  const { chainId } = useDHConnect();
  const chainIdLocal = chainId || DEFAULT_NETWORK_ID;
  return (
    <StyledDaoCard className="dao-card">
      <div className="top-row">
        <div className="top-box">
          <div className="alert-box">
            <ProfileAvatar size="xl" address={id} image={avatarImg} />
            {activeProposals && activeProposals.length > 0 && (
              <Tooltip
                content={`${activeProposals.length} Active Proposals (in voting or grace period)`}
                triggerEl={
                  <Badge
                    badgeSize="sm"
                    badgeLabel={activeProposals.length}
                    className="badge"
                    badgeColor="blue"
                  />
                }
              />
            )}
          </div>
        </div>
        <StyledLink to={`/molochv3/${chainIdLocal}/${id}/articles`}><ParLg className="dao-title">
          {name ? charLimit(name, 21) : charLimit(id, 21)}{" "}
        </ParLg></StyledLink>
        <div className="stats-box">
          {activeMemberCount && (
            <ParMd>
              <Bold>
                {readableNumbers.toNumber({ value: (Number(activeMemberCount) - 1).toString() })}
              </Bold>{" "}
              {parseInt(
                readableNumbers.toNumber({ value: (Number(activeMemberCount) - 1).toString() })
              ) === 1
                ? "Member"
                : "Members"}
            </ParMd>
          )}
          {proposalCount && (
            <ParMd>
              <Bold>{readableNumbers.toNumber({ value: proposalCount })}</Bold>{" "}
              {parseInt(readableNumbers.toNumber({ value: proposalCount })) === 1
                ? "Article"
                : "Articles"}
            </ParMd>
          )}
        </div>

        {tags?.length && (<div class-name="tag-box">
          <ParSm>Tags:</ParSm>
          {tags.map((tag) => (
            <Tag key={tag} tagColor="blue">
              {tag}
            </Tag>
          ))}
        </div>)}

        {/* <div className="tag-box">
          <Tag tagColor="red">{getNetworkName(chainIdLocal || DEFAULT_NETWORK_ID)}</Tag>
        </div> */}
      </div>
      {description && (<div className="description-box">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>)}
      <div className="button-box">
      <ButtonRouterLink
          color="secondary"
          to={`/molochv3/${chainIdLocal}/${id}/articles`}
        >
          Articles
        </ButtonRouterLink>
        <ButtonRouterLink
          color="secondary"
          to={`/molochv3/${chainIdLocal}/${id}`}
        >
          Currator Dashboard
        </ButtonRouterLink>
        <ButtonRouterLink
          color="secondary"
          to={`/molochv3/${chainIdLocal}/${id}/polls`}
        >
          Collector Dashboard
        </ButtonRouterLink>
      </div>
    </StyledDaoCard>
  );
};
