import type { FC } from 'react';
import { Typography } from '@mui/material';
import { useFetchNFTByOwner } from '../../hook/useFetchNFTByOwner';
import FetchTokenDetails from './fetch-token-details';

type FetchOwnerTokensProps = {
  tokenIndex: number;
};

/**
 * Fetch NFT tokens owned by a specific user for a specific index.
 * @param param0 - The token index to fetch.
 * @returns {JSX.Element} - The rendered component.
 */
const FetchOwnerTokens: FC<FetchOwnerTokensProps> = ({ tokenIndex }) => {
  const {
    tokenId,
    isLoading: NFTFetchLoading,
    error: NFTFetchError,
  } = useFetchNFTByOwner({ tokenIndex });

  if (NFTFetchLoading) return <Typography>Loading...</Typography>;
  if (NFTFetchError)
    return <Typography>Error: {NFTFetchError?.message}</Typography>;

  return <FetchTokenDetails tokenId={Number(tokenId)} />;
};
export default FetchOwnerTokens;
