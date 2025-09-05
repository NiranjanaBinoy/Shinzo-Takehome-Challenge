import { useEffect, useReducer, useState, type ReactNode } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { NFTContext } from '../hook/useNFTContext';
import type { Address, Context, StoreAction, StoreState } from '../types/types';

const NFTReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case 'SET_NFT_DETAILS':
      return {
        ...state,
        nftDetails: {
          ...state.nftDetails,
          ...action.payload,
        },
      };
    case 'ADD_NFT_DETAIL': {
      const { userAddress, chainId, NFTDetails } = action.payload;
      const tokenExists = state.nftDetails[userAddress]?.[chainId]?.some(
        (nft) => nft.tokenId === NFTDetails.tokenId
      );
      if (!tokenExists) {
        return {
          ...state,
          nftDetails: {
            ...state.nftDetails,
            [userAddress]: {
              ...state.nftDetails[userAddress],
              [chainId]: [
                ...(state.nftDetails[userAddress]?.[chainId] || []),
                NFTDetails,
              ],
            },
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
};

const NFTContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(NFTReducer, { nftDetails: {} });
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const [quantity, setQuantity] = useState<number>(1);

  const resetQuantity = () => setQuantity(1);

  const handleDecrement = () =>
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  const handleIncrement = () => setQuantity((prevQuantity) => prevQuantity + 1);

  useEffect(() => {
    localStorage.setItem('nftCollection', JSON.stringify(state.nftDetails));
  }, [state.nftDetails]);

  const contextValue: Context = {
    state,
    isConnected,
    userAddress: address as Address,
    chainId,
    quantity,
    dispatch,
    resetQuantity,
    handleDecrement,
    handleIncrement,
  };

  return (
    <NFTContext.Provider value={contextValue}>{children}</NFTContext.Provider>
  );
};

export default NFTContextProvider;
