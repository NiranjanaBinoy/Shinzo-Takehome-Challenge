import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useNFTContext } from './useNFTContext';
import { SHINZO_TOKEN_CONTRACT_ADDRESS } from '../constant/contract';
import { ABI } from '../abi';
import type { Address, TokenId } from '../types/types';
import { useEffect } from 'react';

type TransferProps = {
  toAddress: Address;
  tokenId: TokenId;
};
const useNFTTransfer = ({ toAddress, tokenId }: TransferProps) => {
  const { userAddress, chainId, dispatch } = useNFTContext();
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isTransfering, isSuccess: isTransfered } =
    useWaitForTransactionReceipt({ hash });

  const onTransfer = async () => {
    writeContract({
      address: SHINZO_TOKEN_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'safeTransferFrom',
      args: [userAddress, toAddress, tokenId],
    });
  };

  useEffect(() => {
    if (isTransfered) {
      dispatch({
        type: 'TRANSFER_NFT',
        payload: { userAddress, chainId, toAddress, tokenId },
      });
    }
  }, [isTransfered, dispatch, userAddress, chainId, toAddress, tokenId]);

  return { onTransfer, hash, isTransfering, isTransfered };
};

export default useNFTTransfer;
