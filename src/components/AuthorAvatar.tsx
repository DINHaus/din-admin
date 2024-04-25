// ExampleComponent.tsx
// import styled from 'styled-components';
import { AddressDisplay, ParSm, ProfileAvatar } from "@daohaus/ui";
import { useProfile } from "@daohaus/moloch-v3-hooks";
import styled from "styled-components";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { DEFAULT_NETWORK_ID } from "../utils/constants";

const AuthorDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-block: 1rem;
`;
export const AuthorAvatar = ({
  address,
  daoChain,
}: {
  address: string;
  daoChain?: ValidNetwork;
}) => {
  const { profile } = useProfile({
    address,
  });

  // console.log("profile >>", profile);
  return (
    <>
      <div>Author</div>
      <AuthorDetails>
        <ProfileAvatar size="sm" address={address} />
        {profile?.ens && <ParSm>{profile.ens}</ParSm>}
        <AddressDisplay
          truncate
          explorerNetworkId={daoChain || DEFAULT_NETWORK_ID}
          address={address}
        />
      </AuthorDetails>
    </>
  );
};
