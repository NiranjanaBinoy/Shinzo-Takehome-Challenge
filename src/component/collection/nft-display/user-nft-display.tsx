import { type FC } from 'react';
import FetchTokens from '../nft-fetch/fetch-tokens';
import DisplayAllNFT from './display-all-nft';

const UserNftDisplay: FC = () => {
  return (
    <>
      <FetchTokens />
      <DisplayAllNFT />
    </>
  );
};

export default UserNftDisplay;
