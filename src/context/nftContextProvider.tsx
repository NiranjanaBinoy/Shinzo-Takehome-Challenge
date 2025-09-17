import { useEffect, useReducer, useState, type ReactNode } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { NFTContext } from '../hook/useNFTContext';
import type { Address, Context, TokenId } from '../types/types';
import NFTReducer from './nftReducer';

const NFTContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(NFTReducer, {
    activeNftDetails: {},
    burnedNftDetails: {},
    upgradedNftDetails: {},
    transferedNftDetails: {},
  });
  const { isConnected, address } = useAccount();
  const chainId = useChainId();

  const [selectedForUpgrade, setSelectedForUpgrade] = useState<TokenId[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const resetQuantity = () => setQuantity(1);

  const handleDecrement = () =>
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  const handleIncrement = () => setQuantity((prevQuantity) => prevQuantity + 1);

  const handleUpgradeSelection = (selectedTokenIds: number[]) => {
    setSelectedForUpgrade(selectedTokenIds);
  };

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('nftCollection');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'SET_NFT_DETAILS', payload: parsed });
      } catch (e) {
        // Ignore parse errors
        console.log(e);
      }
      setIsHydrated(true);
    } else {
      setIsHydrated(true);
    }
  }, []);

  // Persist state to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('nftCollection', JSON.stringify(state));
    }
  }, [state, isHydrated]);

  const contextValue: Context = {
    state,
    isConnected,
    userAddress: address as Address,
    chainId,
    quantity,
    selectedForUpgrade,
    dispatch,
    resetQuantity,
    handleDecrement,
    handleIncrement,
    handleUpgradeSelection,
  };

  return (
    <NFTContext.Provider value={contextValue}>{children}</NFTContext.Provider>
  );
};

export default NFTContextProvider;
