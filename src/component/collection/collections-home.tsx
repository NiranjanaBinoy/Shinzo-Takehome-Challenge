import { type FC } from 'react';
import FetchTokens from './fetch-tokens';
import DisplayAllNFT from './display-all-nft';
import { Divider } from '@mui/material';
import UserInfo from './user-info';

/**
 * CollectionsHome component.
 * @returns {JSX.Element} - The rendered component.
 */
const CollectionsHome: FC = () => {
  return (
    <>
      <UserInfo />
      <Divider sx={{ borderColor: '#252525', margin: 4 }} />
      <FetchTokens />
      <DisplayAllNFT />
    </>
  );
};

export default CollectionsHome;
