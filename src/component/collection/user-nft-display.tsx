import { type FC } from 'react';
import FetchTokens from './fetch-tokens';
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
