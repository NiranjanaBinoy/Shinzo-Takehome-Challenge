export type Hex = `0x${string}`;
export type Address = Hex;
export type TokenId = number;

export type Context = {
  state: StoreState;
  isConnected: boolean;
  userAddress: Address;
  quantity: number;
  chainId: number;
  selectedForUpgrade: number[];
  dispatch: React.Dispatch<StoreAction>;
  resetQuantity: () => void;
  handleDecrement: () => void;
  handleIncrement: () => void;
  handleUpgradeSelection: (sele: number[]) => void;
};

export type NFTDetails = {
  name?: string;
  symbol?: string;
  tokenId: number;
  tokenURI?: string;
};
export type NFTDetailsMap = {
  [userAddress: Address]: {
    [chainId: number]: NFTDetails[] | [];
  };
};
export type UpgradedNFTDetailsMap = {
  [userAddress: Address]: {
    [chainId: number]: [NFTDetails, NFTDetails][] | [];
  };
};
export type StoreState = {
  activeNftDetails: NFTDetailsMap;
  burnedNftDetails: NFTDetailsMap;
  upgradedNftDetails: UpgradedNFTDetailsMap;
};

export type StoreAction =
  | { type: 'SET_NFT_DETAILS'; payload: StoreState }
  | {
      type: 'ADD_NFT_DETAIL';
      payload: {
        userAddress: Address;
        chainId: number;
        NFTDetails: NFTDetails;
      };
    }
  | {
      type: 'BURN_NFT_DETAIL';
      payload: {
        userAddress: Address;
        chainId: number;
        tokenId: TokenId;
      };
    }
  | {
      type: 'UPGRADED_NFT_DETAIL';
      payload: {
        userAddress: Address;
        chainId: number;
        tokenId1: TokenId;
        tokenId2: TokenId;
      };
    };

export type NFTReducer = (state: StoreState, action: StoreAction) => StoreState;

export type ReadContractResult<T> = {
  isLoading: boolean;
  error: Error | null;
} & {
  [key: string]: T | boolean | Error | null | undefined;
};
