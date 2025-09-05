import { useEffect } from 'react';
import { useFetchNFTTokenURI } from '../../hook/useFetchNFTTokenURI';
import { useNFTContext } from '../../hook/useNFTContext';
import { useFetchNFTSymbol } from '../../hook/useFetchNFTSymbol';
import { useFetchNFTName } from '../../hook/useFetchNFTName';
import { Typography } from '@mui/material';
import type { NFTDetails } from '../../types/types';

/**
 * Fetch token details by token ID.
 * @param param0 - The token ID to fetch.
 * @returns {JSX.Element} - The rendered component.
 */
const FetchTokenDetails = ({ tokenId }: { tokenId: number }) => {
  const { dispatch, userAddress, chainId } = useNFTContext();
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
      const nftDetails: NFTDetails = {
        tokenId: tokenId,
        tokenURI: tokenURI as string,
        name: name as string,
        symbol: symbol as string,
      };
      dispatch({
        type: 'ADD_NFT_DETAIL',
        payload: { userAddress, chainId, NFTDetails: nftDetails },
      });
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
    userAddress,
    chainId,
  ]);

  if (isURILoading || isSymbolLoading || isNameLoading)
    return <Typography>Loading...</Typography>;

  if (uriError || symbolError || nameError)
    return (
      <Typography>
        Error: {uriError?.message || symbolError?.message || nameError?.message}
      </Typography>
    );

  return null;
};
export default FetchTokenDetails;
