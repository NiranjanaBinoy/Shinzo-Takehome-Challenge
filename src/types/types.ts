export type Hex = `0x${string}`;
export type Address = Hex;

export type Context = {
  state: StoreState;
  isConnected: boolean;
  userAddress: Address;
  quantity: number;
  dispatch: React.Dispatch<StoreAction>;
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
  nftDetails: NFTDetails[] | [];
};

export type StoreAction =
  | { type: 'SET_NFT_DETAILS'; payload: NFTDetails[] }
  | { type: 'ADD_NFT_DETAIL'; payload: NFTDetails }
  | { type: 'UPDATE_NFT_DETAIL'; payload: NFTDetails };

export type NFTReducer = (state: StoreState, action: StoreAction) => StoreState;

export type ReadContractResult<T> = {
  isLoading: boolean;
  error: Error | null;
} & {
  [key: string]: T | boolean | Error | null | undefined;
};
