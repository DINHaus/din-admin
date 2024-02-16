import { useDHConnect } from "@daohaus/connect";
import { HomeDashboard } from "../components/hub/HomeDashboard";
import { HomeNotConnected } from "../components/hub/HomeNotConnected";

export const Home = () => {
  const { isConnected, address } = useDHConnect();

  return address && isConnected ? <HomeDashboard /> : <HomeNotConnected />;
};
