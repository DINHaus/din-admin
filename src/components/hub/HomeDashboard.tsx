import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

import { handleErrorMessage } from "@daohaus/utils";
import { listDaos, ListDaosQueryResDaos } from "@daohaus/moloch-v3-data";
import {
  H2,
  Loading,
  useBreakpoint,
  useDebounce,
  widthQuery,
} from "@daohaus/ui";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDHConnect } from "@daohaus/connect";
import { DEFAULT_SORT_KEY, SORT_FIELDS } from "../../utils/hub";
import { ListActions } from "./ListActions";
import { DaoList } from "./DaoList";
import { NFT_DAO_REFERRER } from "../../utils/constants";

export enum ListType {
  Cards,
  Table,
}

export const HomeDashboard = () => {
  const isMobile = useBreakpoint(widthQuery.sm);
  const { chainId } = useDHConnect();
  const [daoData, setDaoData] = useState<ListDaosQueryResDaos>([]);
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_KEY);
  const [searchTerm, setSearchTerm] = useState<string | "">("");
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    let shouldUpdate = true;
    const getDaos = async (chainId: ValidNetwork) => {
      setLoading(true);
      try {
        const query = await listDaos({
          networkId: chainId,
          filter: {
            name_contains_nocase: debouncedSearchTerm,
            referrer: NFT_DAO_REFERRER,
          },
          ordering: SORT_FIELDS[sortBy].ordering,
          graphApiKeys: {
            "0x1": process.env["NX_GRAPH_API_KEY_MAINNET"],
            "0x64": process.env["NX_GRAPH_API_KEY_MAINNET"],
          },
        });
        if (query.items && shouldUpdate) {
          console.log("query.items", query.items);
          setDaoData(query.items);
          setLoading(false);
        }
      } catch (error) {
        const errMsg = handleErrorMessage({
          error,
          fallback: "Error loading DAOs",
        });
        console.error(errMsg);
      } finally {
        setLoading(false);
      }
    };
    if (!chainId) return;
    getDaos(chainId);
    return () => {
      shouldUpdate = false;
    };
  }, [sortBy, debouncedSearchTerm, chainId]);

  const switchSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const tableControlProps = {
    switchSortBy,
    setSearchTerm,
    sortBy,
    searchTerm,
    totalDaos: daoData.length,
    noun: {
      singular: "DAO",
      plural: "DAOs",
    },
  };

  if (!daoData.length) {
    return (
      <ListActions {...tableControlProps}>
        <NoDaosFound />
      </ListActions>
    );
  }
  if (loading) {
    return (
      <ListActions {...tableControlProps}>
        <LoadingContainer isMobile={isMobile} />
      </ListActions>
    );
  }
  return (
    <ListActions {...tableControlProps}>
      <DaoList daoData={daoData} />
    </ListActions>
  );
};

const CenterFrame = styled.div`
  height: 30rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner {
    position: absolute;
  }
`;

const LoadingContainer = ({ isMobile }: { isMobile: boolean }) => (
  <CenterFrame>
    <div className="inner">
      <Loading size={isMobile ? 80 : 160} />
    </div>
  </CenterFrame>
);
const NoDaosFound = () => (
  <CenterFrame>
    <H2>No Daos Found</H2>
  </CenterFrame>
);
