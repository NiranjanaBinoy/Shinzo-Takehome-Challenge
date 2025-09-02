import { useEffect, useReducer, useState, type ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { NFTContext } from '../hook/useNFTContext';
import type { Address, Context, StoreAction, StoreState } from '../types/types';

const NFTReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case 'SET_NFT_DETAILS':
      return {
        ...state,
        nftDetails: action.payload,
      };
    case 'ADD_NFT_DETAIL': {
      const tokenExists = state.nftDetails.some(
        (nft) => nft.tokenId === action.payload.tokenId
      );
      if (!tokenExists) {
        return {
          ...state,
          nftDetails: [...state.nftDetails, action.payload],
        };
      }
      return state;
    }
    default:
      return state;
  }
};

const NFTContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(NFTReducer, { nftDetails: [] });
  const { isConnected, address } = useAccount();
  const [quantity, setQuantity] = useState<number>(1);
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
    quantity,
    dispatch,
    handleDecrement,
    handleIncrement,
  };

  return (
    <NFTContext.Provider value={contextValue}>{children}</NFTContext.Provider>
  );
};

export default NFTContextProvider;
