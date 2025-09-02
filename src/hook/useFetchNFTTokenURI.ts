import { useReadContract } from 'wagmi';
import { SHINZO_TOKEN_CONTRACT_ADDRESS } from '../constant/contract';
import { ABI } from '../abi';
import type { ReadContractResult } from '../types/types';

/**
 * Custom hook to fetch the token URI of an NFT from the smart contract.
 * @param param0 - The token ID of the NFT.
 * @returns {ReadContractResult<string>} - The token URI, loading state, and error (if any).
 */
export const useFetchNFTTokenURI = ({
  tokenId,
}: {
  tokenId: number;
}): ReadContractResult<string> => {
  const {
    data: tokenURI,
    isLoading,
    error,
  } = useReadContract({
    address: SHINZO_TOKEN_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  });

  return { tokenURI: tokenURI as string, isLoading, error };
};
