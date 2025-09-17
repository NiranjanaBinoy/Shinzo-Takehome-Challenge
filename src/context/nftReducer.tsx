import type { NFTDetails, StoreAction, StoreState } from '../types/types';

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
    case 'TRANSFER_NFT': {
      const { userAddress, chainId, toAddress, tokenId } = action.payload;
      const userNFTs = state.activeNftDetails[userAddress]?.[chainId] || [];
      let transferedToken: NFTDetails | null = null;
      const filteredTokens = userNFTs.filter((token) => {
        if (token.tokenId === tokenId) {
          transferedToken = token;
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
            [chainId]: filteredTokens,
          },
        },
        transferedNftDetails: {
          ...state.transferedNftDetails,
          [userAddress]: {
            ...state.transferedNftDetails[userAddress],
            [chainId]: [
              ...(state.transferedNftDetails[userAddress]?.[chainId] || []),
              {
                ...(transferedToken || {}),
                toAddress,
              },
            ],
          },
        },
      };
    }
    default:
      return state;
  }
};

export default NFTReducer;
