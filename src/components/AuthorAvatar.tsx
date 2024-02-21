// ExampleComponent.tsx
// import styled from 'styled-components';
import { AddressDisplay, ParSm, ProfileAvatar } from '@daohaus/ui';
import { useCurrentDao, useProfile } from '@daohaus/moloch-v3-hooks';
import styled from 'styled-components';
 
 
const AuthorDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;
export const AuthorAvatar = (
    { address }: { address: string }
) => {
    const { profile } = useProfile({
        address
      });
      const { daoChain} = useCurrentDao();

      if (!daoChain) {
        return null;
      }
    // console.log("profile >>", profile);
  return (
    <AuthorDetails>
      <ProfileAvatar size='sm' address={address} />
      {profile?.ens && (<ParSm>{profile.ens}</ParSm>)}
      <AddressDisplay truncate explorerNetworkId={daoChain} address={address} />
    </AuthorDetails>
  );
};