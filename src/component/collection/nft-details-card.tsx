import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import type { NFTDetails } from '../../types/types';
import NFTCardOverLay from './nft-card-overlay';
import NFTUpgradeSelection from './nft-upgrade-selection';
import type { FC } from 'react';

type NFTDetailsCardProps = {
  nft: NFTDetails;
};

/**
 * NFTDetailsCard component displays the details of a specific NFT.
 * @param param0 - The NFT details to display.
 * @returns {JSX.Element} - The rendered component.
 */
const NFTDetailsCard: FC<NFTDetailsCardProps> = ({ nft }) => {
  return (
    <Box
      key={nft.tokenId}
      sx={{ borderColor: '#4C0000', borderWidth: 2, borderStyle: 'solid' }}
    >
      <Card
        key={nft.tokenId}
        sx={{
          position: 'relative',
          maxWidth: 250,
          backgroundColor: '#000000',
          color: '#ffffff',
          borderColor: '#ffffff',
          '&:hover .overlay': {
            opacity: 1,
            pointerEvents: 'auto',
          },
        }}
      >
        <NFTUpgradeSelection nft={nft} />
        <CardMedia
          component="img"
          height="240"
          image={nft.tokenURI}
          alt={nft.name}
        />
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography
            sx={{
              fontFamily: 'Pixelify Sans, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
            }}
          >
            {nft.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '11px',
            }}
          >
            TOKEN #{nft.tokenId}
          </Typography>
        </CardContent>
        <NFTCardOverLay tokenId={nft.tokenId} />
      </Card>
    </Box>
  );
};

export default NFTDetailsCard;
