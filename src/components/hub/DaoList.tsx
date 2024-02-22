import styled from "styled-components";

import { breakpoints } from "@daohaus/ui";
import { ListDaosQueryResDaos } from "@daohaus/moloch-v3-data";

import { DaoCard } from "./DaoCard";

export const DaoList = ({ daoData }: { daoData: ListDaosQueryResDaos }) => {
  return <DaoCards daoData={daoData} />;

  return null;
};

const CardListBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  column-gap: 1rem;
  row-gap: 2rem;
  justify-content: center;
  @media (min-width: ${breakpoints.xs}) {
    justify-content: flex-start;
  }
`;

const DaoCards = ({ daoData }: { daoData: ListDaosQueryResDaos }) => (
  <CardListBox>
    {daoData.map((dao) => (
      <DaoCard key={dao.id} {...dao} />
    ))}
  </CardListBox>
);
