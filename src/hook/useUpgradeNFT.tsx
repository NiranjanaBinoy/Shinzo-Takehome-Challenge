import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { SHINZO_TOKEN_CONTRACT_ADDRESS } from '../constant/contract';
import { ABI } from '../abi';
import { useEffect } from 'react';
import { useNFTContext } from './useNFTContext';

const useUpgradeNFT = ([tokenId1, tokenId2]: number[]) => {
  const { userAddress, chainId, dispatch } = useNFTContext();
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isUpgrading, isSuccess: isUpgraded } =
    useWaitForTransactionReceipt({ hash });

  async function onUpgrade() {
    writeContract({
      address: SHINZO_TOKEN_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'upgradeNFT',
      args: [tokenId1, tokenId2],
    });
  }

  useEffect(() => {
    if (isUpgraded) {
      dispatch({
        type: 'UPGRADED_NFT_DETAIL',
        payload: { userAddress, chainId, tokenId1, tokenId2 },
      });
    }
  }, [isUpgraded, dispatch, tokenId1, tokenId2, userAddress, chainId]);

  return { onUpgrade, hash, isUpgrading, isUpgraded };
};

export default useUpgradeNFT;
