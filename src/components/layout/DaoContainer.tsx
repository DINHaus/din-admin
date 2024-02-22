import { useMemo } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

import { DHLayout, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";
import { HeaderAvatar } from "../HeaderAvatar";
import { useShamanNFT } from "../../hooks/useShamanNFT";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

export const DaoContainer = () => {
  const { proposalId, memberAddress, daoChain, daoId } = useParams<{
    daoChain: ValidNetwork;
    daoId: string;
    proposalId: string;
    memberAddress: string;
  }>();

  if (!daoId || !daoChain) return null;

  return (
    <Dao
      daoId={daoId}
      daoChain={daoChain}
      proposalId={proposalId}
      memberAddress={memberAddress}
    />
  );
};

const DaoWrapper = ({
  dao,
  daoChain,
  memberAddress,
}: {
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
  memberAddress?: string;
}) => {


  const { publicClient, address } = useDHConnect();

  const { shamanName, shamanAddress, sdata, isLoading: isShamanLoading } = useShamanNFT({ dao: dao, chainId: daoChain });

  if (isShamanLoading) {
    return <div>Loading...</div>;
  }

  return (

        <TXBuilder
          publicClient={publicClient}
          chainId={daoChain}
          daoId={dao?.id}
          safeId={dao?.safeAddress}
          appState={{ dao, memberAddress: memberAddress || address, shamanData: {shamanName, shamanAddress, sdata} }}
        >
          <Outlet />
        </TXBuilder>

  );
};

const Dao = ({
  daoId,
  daoChain,
  proposalId,
  memberAddress,
}: {
  daoId: string;
  daoChain: ValidNetwork;
  proposalId?: string;
  memberAddress?: string;
}) => {
  const location = useLocation();

  const { address } = useDHConnect();
  const { dao } = useDaoData({
    daoId: daoId as string,
    daoChain: daoChain as string,
  });

  const routePath = `molochv3/${daoChain}/${daoId}`;

  const navLinks = useMemo(() => {
    let baseLinks = [
      { label: "Hub", href: `/` },
      { label: "Articles", href: `/${routePath}/articles` },
      { label: "Curators", href: `/${routePath}` },
      { label: "Collectors", href: `/${routePath}/polls` },

      // { label: "Safes", href: `/${routePath}/safes` },
      // { label: "Proposals", href: `/${routePath}/proposals` },
      // { label: "Members", href: `/${routePath}/members` },
      // { label: "Settings", href: `/${routePath}/settings` },
    ];
    // return baseLinks;

    return address
      ? [
          ...baseLinks,
          { label: "Profile", href: `/${routePath}/member/${address}` },
        ]
      : baseLinks;
  }, [daoChain, daoId, address]);

  if (!dao) return null;

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={navLinks}
      leftNav={
        dao?.name &&
        dao?.id && (
          <HeaderAvatar
            name={dao.name}
            address={dao.id}
            imgUrl={dao?.avatarImg}
          />
        )
      }
    >
      <CurrentDaoProvider
        userAddress={address}
        targetDao={{
          daoChain: daoChain,
          daoId: daoId,
          proposalId,
          memberAddress,
        }}
      >
        <DaoWrapper dao={dao} daoChain={daoChain} memberAddress={memberAddress} />
      </CurrentDaoProvider>
    </DHLayout>
  );
};
