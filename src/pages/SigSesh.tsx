
import React from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { ParLg, ParSm, SingleColumnLayout } from "@daohaus/ui";


export const SigSesh = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout title="Community Polls">
      <ParLg>Collector Signal Sessions</ParLg>
      <ParSm>Community initiated Polls to help prioritize and guide the currators.</ParSm>
    </SingleColumnLayout>
  );
};
