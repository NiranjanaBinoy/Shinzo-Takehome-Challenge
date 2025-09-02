import Box from '@mui/material/Box';
import { useFetchNFTBalance } from '../../hook/useFetchNFTBalance';
import FetchOwnerTokens from './fetch-owner-tokens';
import { useNFTContext } from '../../hook/useNFTContext';
import { useEffect } from 'react';

/**
 * Fetch NFT tokens owned by a specific user.
 * @returns {JSX.Element} - The rendered component.
 */
const FetchTokens = () => {
  const { balance, isLoading, error } = useFetchNFTBalance();
  const { state, dispatch } = useNFTContext();

  // fetching the state from the local storage and setting that to the context if no new nft is detected.
  useEffect(() => {
    const nftCollection = JSON.parse(
      localStorage.getItem('nftCollection') || '[]'
    );
    if (Number(balance) === nftCollection?.length) {
      dispatch({ type: 'SET_NFT_DETAILS', payload: nftCollection });
    }
  }, [balance, dispatch]);

  if (state.nftDetails.length === Number(balance)) return null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box>
      {Array.from({ length: Number(balance) }, (_, i) => (
        <FetchOwnerTokens key={i} tokenIndex={i} /> // Fetching each owner's tokens while looping through the balance as index
      ))}
    </Box>
  );
};

export default FetchTokens;
