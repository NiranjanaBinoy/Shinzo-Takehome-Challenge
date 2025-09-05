import { useReadContract } from 'wagmi';
import { SHINZO_TOKEN_CONTRACT_ADDRESS } from '../constant/contract';
import { ABI } from '../abi';
import { useNFTContext } from './useNFTContext';
import type { ReadContractResult } from '../types/types';

/**
 * Custom hook to fetch the NFT balance of a user.
 * @returns {ReadContractResult<number>} - The NFT balance, loading state, and error (if any).
 */
export const useFetchNFTBalance = (): ReadContractResult<number> => {
  const { userAddress } = useNFTContext();

  const {
    data: balance,
    isLoading,
    error,
  } = useReadContract({
    address: SHINZO_TOKEN_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'balanceOf',
    args: [userAddress],
  });

  return { balance: balance ? Number(balance) : 0, isLoading, error };
};
