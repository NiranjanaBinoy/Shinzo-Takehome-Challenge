import { useEffect, type FC } from 'react';
import { Divider } from '@mui/material';
import UserInfo from './user-info';
import { useNFTContext } from '../../hook/useNFTContext';
import UserNftDisplay from './nft-display/user-nft-display';

/**
 * CollectionsHome component.
 * @returns {JSX.Element} - The rendered component.
 */
const CollectionsHome: FC = () => {
  const { userAddress, handleUpgradeSelection } = useNFTContext();

  useEffect(() => {
    handleUpgradeSelection([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  return (
    <>
      <UserInfo />
      <Divider sx={{ borderColor: '#252525', margin: 4 }} />
      <UserNftDisplay />
    </>
  );
};

export default CollectionsHome;
