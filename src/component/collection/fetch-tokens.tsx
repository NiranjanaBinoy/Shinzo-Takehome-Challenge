import type { FC } from 'react';
import Box from '@mui/material/Box';
import { useFetchNFTBalance } from '../../hook/useFetchNFTBalance';
import FetchOwnerTokens from './fetch-owner-tokens';
import { useNFTContext } from '../../hook/useNFTContext';
import { Typography } from '@mui/material';

/**
 * Fetch NFT tokens owned by a specific user.
 * @returns {JSX.Element} - The rendered component.
 */
const FetchTokens: FC = () => {
  const { balance, isLoading, error } = useFetchNFTBalance();
  const { state, userAddress, chainId } = useNFTContext();

  if (
    state.activeNftDetails[userAddress]?.[chainId]?.length === Number(balance)
  ) {
    return null;
  }

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error)
    return Number(balance) === 0 ? (
      <Typography>
        Error occured while fetching NFT balance, please try again later.
      </Typography>
    ) : null;

  return (
    <Box>
      {Array.from({ length: Number(balance) }, (_, i) => (
        <FetchOwnerTokens key={i} tokenIndex={i} /> // Fetching each owner's tokens while looping through the balance as index
      ))}
    </Box>
  );
};

export default FetchTokens;
