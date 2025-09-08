import { useEffect, useReducer, useState, type ReactNode } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { NFTContext } from '../hook/useNFTContext';
import type {
  Address,
  Context,
  NFTDetails,
  StoreAction,
  StoreState,
} from '../types/types';

const NFTReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case 'SET_NFT_DETAILS':
      return {
        ...state,
        ...action.payload,
      };
    case 'ADD_NFT_DETAIL': {
      const { userAddress, chainId, NFTDetails } = action.payload;

      const tokenExistsInActiveNFTs = state.activeNftDetails[userAddress]?.[
        chainId
      ]?.some((nft) => nft.tokenId === NFTDetails.tokenId);

      const tokenExistsInSacrificesNFTs = state.burnedNftDetails[userAddress]?.[
        chainId
      ]?.some((nft) => nft.tokenId === NFTDetails.tokenId);

      const tokenExistsInUpgradedNFTs = state.upgradedNftDetails[userAddress]?.[
        chainId
      ]?.some((nfts) => nfts.some((nft) => nft.tokenId === NFTDetails.tokenId));

      if (
        !tokenExistsInActiveNFTs &&
        !tokenExistsInSacrificesNFTs &&
        !tokenExistsInUpgradedNFTs
      ) {
        return {
          ...state,
          activeNftDetails: {
            ...state.activeNftDetails,
            [userAddress]: {
              ...state.activeNftDetails[userAddress],
              [chainId]: [
                ...(state.activeNftDetails[userAddress]?.[chainId] || []),
                NFTDetails,
              ],
            },
          },
        };
      }
      return state;
    }
    case 'BURN_NFT_DETAIL': {
      const { userAddress, chainId, tokenId } = action.payload;
      const userNFTs = state.activeNftDetails[userAddress]?.[chainId] || [];

      let burnedNFT: NFTDetails | null = null;
      const updatedNFTs = userNFTs.filter((nft) => {
        if (nft.tokenId === tokenId) {
          burnedNFT = nft;
          return false;
        }
        return true;
      });

      return {
        ...state,
        activeNftDetails: {
          ...state.activeNftDetails,
          [userAddress]: {
            ...state.activeNftDetails[userAddress],
            [chainId]: updatedNFTs,
          },
        },
        burnedNftDetails: {
          ...state.burnedNftDetails,
          [userAddress]: {
            ...state.burnedNftDetails[userAddress],
            [chainId]: [
              ...(state.burnedNftDetails[userAddress]?.[chainId] || []),
              burnedNFT || {},
            ],
          },
        },
      };
    }
    case 'UPGRADED_NFT_DETAIL': {
      const { userAddress, chainId, tokenId1, tokenId2 } = action.payload;
      const userNFTs = state.activeNftDetails[userAddress]?.[chainId] || [];

      let upgradedNFT: NFTDetails[] | null = null;
      const updatedNFTs = userNFTs.filter((nft) => {
        if (nft.tokenId === tokenId1 || nft.tokenId === tokenId2) {
          upgradedNFT = upgradedNFT ? [...upgradedNFT, nft] : [nft];
          return false;
        }
        return true;
      });

      return {
        ...state,
        activeNftDetails: {
          ...state.activeNftDetails,
          [userAddress]: {
            ...state.activeNftDetails[userAddress],
            [chainId]: updatedNFTs,
          },
        },
        upgradedNftDetails: {
          ...state.upgradedNftDetails,
          [userAddress]: {
            ...state.upgradedNftDetails[userAddress],
            [chainId]: [
              ...(state.upgradedNftDetails[userAddress]?.[chainId] || []),
              upgradedNFT || [],
            ],
          },
        },
      };
    }
    default:
      return state;
  }
};

const NFTContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(NFTReducer, {
    activeNftDetails: {},
    burnedNftDetails: {},
    upgradedNftDetails: {},
  });
  const { isConnected, address } = useAccount();
  const chainId = useChainId();

  const [selectedForUpgrade, setSelectedForUpgrade] = useState<number[]>([]);
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
