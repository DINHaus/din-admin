import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { DaoOverview } from "@daohaus/moloch-v3-macro-ui";
import { Card, SingleColumnLayout } from "@daohaus/ui";
import ReactMarkdown from "react-markdown";
import { ButtonRouterLink } from "../components/ButtonRouterLink";
import styled from "styled-components";

const ButtonList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export function Dao() {
  const { daoChain, daoId } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout>
      {daoId && daoChain && (
        <ButtonList>
          <ButtonRouterLink
            color="secondary"

            to={`/molochv3/${daoChain}/${daoId}/safes`}
          >
            Safes
          </ButtonRouterLink>
          <ButtonRouterLink
            color="secondary"
            fullWidth
            to={`/molochv3/${daoChain}/${daoId}/proposals`}
          >
            Proposals
          </ButtonRouterLink>
          <ButtonRouterLink
            color="secondary"
            fullWidth
            to={`/molochv3/${daoChain}/${daoId}/members`}
          >
            Members
          </ButtonRouterLink>
          <ButtonRouterLink
            color="secondary"
            fullWidth
            to={`/molochv3/${daoChain}/${daoId}/settings`}
          >
            Settings
          </ButtonRouterLink>

        </ButtonList>)}
      {daoId && daoChain && (<Card
        title={dao?.name}
      >
        <ReactMarkdown>{dao?.description}</ReactMarkdown>
        <ReactMarkdown>{dao?.longDescription}</ReactMarkdown>

      </Card>)}

      {daoId && daoChain && <DaoOverview daoChain={daoChain} daoId={daoId} />}
    </SingleColumnLayout>
  );
}

export default Dao;
