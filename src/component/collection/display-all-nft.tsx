import { Grid } from '@mui/material';
import { useNFTContext } from '../../hook/useNFTContext';
import NFTDetailsCard from './nft-details-card';

/**
 * Display all NFTs.
 * @returns {JSX.Element} - The rendered component.
 */
const Display = () => {
  const { state } = useNFTContext();

  return (
    <Grid container spacing={3} sx={{ margin: 6 }}>
      {state.nftDetails.map((nft) => (
        <NFTDetailsCard key={nft.tokenId} nft={nft} />
      ))}
    </Grid>
  );
};

export default Display;
