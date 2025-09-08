import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { SHINZO_TOKEN_CONTRACT_ADDRESS } from '../constant/contract';
import { ABI } from '../abi';
import { useEffect } from 'react';
import { useNFTContext } from './useNFTContext';

const useSacrificeNFT = (tokenId: number) => {
  const { userAddress, chainId, dispatch } = useNFTContext();
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isSacrificing, isSuccess: isSacrificed } =
    useWaitForTransactionReceipt({ hash });

  async function onSacrifice() {
    writeContract({
      address: SHINZO_TOKEN_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'burn',
      args: [tokenId],
    });
  }

  useEffect(() => {
    if (isSacrificed) {
      dispatch({
        type: 'BURN_NFT_DETAIL',
        payload: { userAddress, chainId, tokenId },
      });
    }
  }, [isSacrificed, dispatch, tokenId, userAddress, chainId]);

  return { onSacrifice, hash, isSacrificing, isSacrificed };
};

export default useSacrificeNFT;
