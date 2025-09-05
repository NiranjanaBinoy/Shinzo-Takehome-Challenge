import Box from '@mui/material/Box';
import { useFetchNFTBalance } from '../../hook/useFetchNFTBalance';
import FetchOwnerTokens from './fetch-owner-tokens';
import { useNFTContext } from '../../hook/useNFTContext';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

/**
 * Fetch NFT tokens owned by a specific user.
 * @returns {JSX.Element} - The rendered component.
 */
const FetchTokens = () => {
  const { balance, isLoading, error } = useFetchNFTBalance();
  const { state, dispatch, userAddress, chainId } = useNFTContext();

  // fetching the state from the local storage and setting that to the context if no new nft is detected.
  useEffect(() => {
    const nftCollection = JSON.parse(
      localStorage.getItem('nftCollection') || '[]'
    );
    if (Number(balance) === nftCollection[userAddress]?.[chainId]?.length) {
      dispatch({
        type: 'SET_NFT_DETAILS',
        payload: {
          [userAddress]: { [chainId]: nftCollection[userAddress]?.[chainId] },
        },
      });
    }
  }, [balance, dispatch, userAddress, chainId]);

  if (state.nftDetails[userAddress]?.[chainId]?.length === Number(balance))
    return null;

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
