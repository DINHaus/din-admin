import { ChangeEvent, MouseEvent, ReactNode } from "react";
import { RiGridFill, RiListCheck } from "react-icons/ri/index.js";
import styled from "styled-components";
import { indigoDark } from "@radix-ui/colors";

import { Noun } from "@daohaus/utils";
import {
  Button,
  ParLg,
  ParXl,
  SingleColumnLayout,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";
import { ListType } from "./HomeDashboard";
import SearchInput from "./SearchInput";
import { DAOFilterDropdown } from "./DaoFilterDropdown";
import { SortDropdown } from "./SortDropdown";
import { sortOptions } from "../../utils/hub";
import { useDHConnect } from "@daohaus/connect";
import { getNetworkName } from "@daohaus/keychain-utils";
import { DEFAULT_NETWORK_ID, SUMMONER_URL } from "../../utils/constants";
import { NewTopicDialog } from "../NewTopicDialog";

type ListActionsProps = {
  children: ReactNode;
  searchTerm: string;
  sortBy: string;
  switchSortBy: (event: ChangeEvent<HTMLSelectElement>) => void;
  setSearchTerm: (term: string) => void;
  totalDaos: number;
  noun: Noun;
};

const IconGrid = styled(RiGridFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  &:hover {
    fill: ${indigoDark.indigo10};
  }
`;

const IconList = styled(RiListCheck)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  &:hover {
    fill: ${indigoDark.indigo10};
  }
`;

const ControlBarBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.6rem;
  .list-toggle {
    margin-right: auto;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
`;

export const ListActions = ({
  children,
  searchTerm,
  setSearchTerm,
  totalDaos,
  noun,
  sortBy,
  switchSortBy,
}: ListActionsProps) => {
  const { chainId } = useDHConnect();
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <SingleColumnLayout>
      {chainId != DEFAULT_NETWORK_ID && <ParLg>**Only Sepolia currently supported**</ParLg>}
      <ControlBarBox>
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalItems={totalDaos}
          noun={noun}
          full={isMobile}
        />
        <ParLg>DIN TOPICS {getNetworkName(chainId || DEFAULT_NETWORK_ID) }</ParLg>
        <SortDropdown
          id="dao-sort"
          value={sortBy}
          onChange={switchSortBy}
          options={sortOptions}
        />
        <NewTopicDialog />
      </ControlBarBox>
      {children}
    </SingleColumnLayout>
  );
};
