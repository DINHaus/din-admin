import { useEffect } from "react";
import {
  Routes as Router,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";

import { ReactSetter } from "@daohaus/utils";

import Dao from "./pages/Dao";
import { FormTest } from "./pages/FormTest";
import { Home } from "./pages/Home";
import { Safes } from "./pages/Safes";
import { Settings } from "./pages/Settings";
import { Proposals } from "./pages/Proposals";
import { Proposal } from "./pages/Proposal";
import { Members } from "./pages/Members";
import { Member } from "./pages/Member";
import { TARGET_DAO } from "./targetDao";
import RageQuit from "./pages/RageQuit";
import { MULTI_DAO_ROUTER } from "@daohaus/moloch-v3-hooks";
import { HomeContainer } from "./components/layout/HomeContainer";
import { DaoContainer } from "./components/layout/DaoContainer";
import NewProposal from "./pages/NewProposal";
import UpdateSettings from "./pages/UpdateSettings";
import { ArticleList } from "./pages/ArticleList";
import { ArticleDetails } from "./pages/ArticleDetails";
import { SubmitForm } from "./pages/SubmitForm";
import { Comments } from "./pages/Comments";
import { SigSesh } from "./pages/SigSesh";
import { AllComments } from "./pages/AllComments";
import { StagingDAO } from "./pages/StagingDAO";
import { PromoteDraftForm } from "./pages/PromoteDraftForm";
import { FeedList } from "./pages/FeedList";

export const Routes = ({
  setDaoChainId,
}: {
  setDaoChainId: ReactSetter<string | undefined>;
}) => {
  const location = useLocation();
  const pathMatch = matchPath("molochv3/:daochain/:daoid/*", location.pathname);

  useEffect(() => {
    if (TARGET_DAO[import.meta.env.VITE_TARGET_KEY]?.CHAIN_ID) {
      setDaoChainId(TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID);
    }
    if (pathMatch?.params?.daochain) {
      setDaoChainId(pathMatch?.params?.daochain);
    }
    if (!pathMatch?.params?.daochain) {
      setDaoChainId(undefined);
    }
  }, [pathMatch?.params?.daochain, setDaoChainId]);

  return (
    <Router>
      <Route path="/" element={<HomeContainer />}>
        <Route path="/" element={<Home />} />
        <Route path="/comments" element={<AllComments />} />
      </Route>
      <Route path={MULTI_DAO_ROUTER} element={<DaoContainer />}>
        <Route index element={<Dao />} />
        <Route path="polls" element={<SigSesh />} />
        <Route path="formtest" element={<FormTest />} />
        <Route path="safes" element={<Safes />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/update" element={<UpdateSettings />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="proposal/:proposalId" element={<Proposal />} />
        <Route path="new-proposal" element={<NewProposal />} />
        <Route path="members" element={<Members />} />
        <Route path="member/:memberAddress" element={<Member />} />
        <Route path="members/ragequit" element={<RageQuit />} />
        <Route path="articles" element={<FeedList/>} />
        <Route path="articles/:hash" element={<ArticleDetails/>} />
        <Route path="articles/:hash/comments" element={<Comments/>} />
        <Route path="comments" element={<StagingDAO/>} />
        <Route path="new" element={<SubmitForm/>} />
        <Route path="edit/:createdAt" element={<PromoteDraftForm/>} />

        <Route path="curate/:daoId/:relatedRecord" element={<SubmitForm/>} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Router>
  );
};
