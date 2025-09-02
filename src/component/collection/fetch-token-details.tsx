import { useEffect } from 'react';
import { useFetchNFTTokenURI } from '../../hook/useFetchNFTTokenURI';
import { useNFTContext } from '../../hook/useNFTContext';
import { useFetchNFTSymbol } from '../../hook/useFetchNFTSymbol';
import { useFetchNFTName } from '../../hook/useFetchNFTName';
import { Box } from '@mui/material';

/**
 * Fetch token details by token ID.
 * @param param0 - The token ID to fetch.
 * @returns {JSX.Element} - The rendered component.
 */
const FetchTokenDetails = ({ tokenId }: { tokenId: number }) => {
  const { dispatch } = useNFTContext();
  const {
    tokenURI,
    isLoading: isURILoading,
    error: uriError,
  } = useFetchNFTTokenURI({ tokenId });
  const {
    symbol,
    isLoading: isSymbolLoading,
    error: symbolError,
  } = useFetchNFTSymbol();
  const {
    name,
    isLoading: isNameLoading,
    error: nameError,
  } = useFetchNFTName();

  useEffect(() => {
    if (!isURILoading && !isSymbolLoading && !isNameLoading) {
      const payload = {
        tokenId: tokenId,
        tokenURI: tokenURI as string,
        name: name as string,
        symbol: symbol as string,
      };
      dispatch({ type: 'ADD_NFT_DETAIL', payload: payload });
    }
  }, [
    tokenId,
    tokenURI,
    name,
    symbol,
    dispatch,
    isURILoading,
    isSymbolLoading,
    isNameLoading,
  ]);

  if (isURILoading || isSymbolLoading || isNameLoading)
    return <Box>Loading...</Box>;

  if (uriError || symbolError || nameError)
    return (
      <Box>
        Error: {uriError?.message || symbolError?.message || nameError?.message}
      </Box>
    );

  return null;
};
export default FetchTokenDetails;
