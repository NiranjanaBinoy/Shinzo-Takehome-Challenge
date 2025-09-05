export type Hex = `0x${string}`;
export type Address = Hex;

export type Context = {
  state: StoreState;
  isConnected: boolean;
  userAddress: Address;
  quantity: number;
  chainId: number;
  dispatch: React.Dispatch<StoreAction>;
  resetQuantity: () => void;
  handleDecrement: () => void;
  handleIncrement: () => void;
};

export type NFTDetails = {
  name?: string;
  symbol?: string;
  tokenId: number;
  tokenURI?: string;
};

export type StoreState = {
  nftDetails: {
    [userAddress: Address]: {
      [chainId: number]: NFTDetails[] | [];
    };
  };
};

export type StoreAction =
  | { type: 'SET_NFT_DETAILS'; payload: StoreState['nftDetails'] }
  | {
      type: 'ADD_NFT_DETAIL';
      payload: {
        userAddress: Address;
        chainId: number;
        NFTDetails: NFTDetails;
      };
    };

export type NFTReducer = (state: StoreState, action: StoreAction) => StoreState;

export type ReadContractResult<T> = {
  isLoading: boolean;
  error: Error | null;
} & {
  [key: string]: T | boolean | Error | null | undefined;
};
