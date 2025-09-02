import { createContext, useContext } from 'react';
import type { Context } from '../types/types';

/**
 * Context provider for NFT-related state and actions.
 */
export const NFTContext = createContext<Context>({
  state: { nftDetails: [] },
  isConnected: false,
  userAddress: '0x',
  quantity: 1,
  dispatch: () => {},
  handleDecrement: () => {},
  handleIncrement: () => {},
});

/**
 * Custom hook to access the NFT context.
 * @returns {Context} - The NFT context value.
 */
export const useNFTContext = () => {
  return useContext(NFTContext);
};
