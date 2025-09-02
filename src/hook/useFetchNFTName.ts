import { useReadContract } from 'wagmi';
import { SHINZO_TOKEN_CONTRACT_ADDRESS } from '../constant/contract';
import { ABI } from '../abi';
import type { ReadContractResult } from '../types/types';

/**
 * Custom hook to fetch the name of the NFT from the smart contract.
 * @returns {ReadContractResult<string>} - The NFT name, loading state, and error (if any).
 */
export const useFetchNFTName = (): ReadContractResult<string> => {
  const {
    data: name,
    isLoading,
    error,
  } = useReadContract({
    address: SHINZO_TOKEN_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'name',
  });

  return { name: name as string, isLoading, error };
};
