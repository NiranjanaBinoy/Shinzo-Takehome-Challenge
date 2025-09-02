import { useReadContract } from 'wagmi';
import { SHINZO_TOKEN_CONTRACT_ADDRESS } from '../constant/contract';
import { ABI } from '../abi';
import type { ReadContractResult } from '../types/types';

/**
 * Custom hook to fetch the symbol of the NFT from the smart contract.
 * @returns {ReadContractResult<string>} - The NFT symbol, loading state, and error (if any).
 */
export const useFetchNFTSymbol = (): ReadContractResult<string> => {
  const {
    data: symbol,
    isLoading,
    error,
  } = useReadContract({
    address: SHINZO_TOKEN_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'symbol',
  });

  return { symbol: symbol as string, isLoading, error };
};
