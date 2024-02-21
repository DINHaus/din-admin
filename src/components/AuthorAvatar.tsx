// ExampleComponent.tsx
// import styled from 'styled-components';
import { AddressDisplay, ParSm, ProfileAvatar } from '@daohaus/ui';
import { useCurrentDao, useProfile } from '@daohaus/moloch-v3-hooks';
 
 
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
    <div>
      <ProfileAvatar size='lg' address={address} />
      {profile?.ens && (<ParSm>{profile.ens}</ParSm>)}
      <AddressDisplay truncate explorerNetworkId={daoChain} address={address} />
    </div>
  );
};