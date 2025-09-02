import { useReadContract } from 'wagmi';
import { SHINZO_TOKEN_CONTRACT_ADDRESS } from '../constant/contract';
import { ABI } from '../abi';
import { useNFTContext } from './useNFTContext';
import type { ReadContractResult } from '../types/types';

/**
 * Fetches the tokenId of the NFT owned by a specific user at a given index.
 * @param tokenIndex - The token index to fetch.
 * @returns The NFT ID owned by the user at the specified index.
 */
export const useFetchNFTByOwner = ({
  tokenIndex,
}: {
  tokenIndex: number;
}): ReadContractResult<number> => {
  const { userAddress } = useNFTContext();

  const {
    data: tokenId,
    isLoading,
    error,
  } = useReadContract({
    address: SHINZO_TOKEN_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'tokenOfOwnerByIndex',
    args: [userAddress, BigInt(tokenIndex)],
  });

  return { tokenId: Number(tokenId), isLoading, error };
};
