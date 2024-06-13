import { DHLayout } from "@daohaus/connect";
import { Footer, H4 } from "@daohaus/ui";
import { Outlet, useLocation } from "react-router-dom";

export const HomeContainer = () => {
  const location = useLocation();

  return (
    <DHLayout
      leftNav={<H4>Decentralized Information Network</H4>}
      pathname={location.pathname}
      navLinks={[
        { label: "Topics", href: `/` },
        { label: "All Feed", href: `/comments` },
        { label: "?", href: `/support` },
      ]}
      footer={<Footer />}
    >
      <Outlet />
    </DHLayout>
  );
};
