import type { FC } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import useSacrificeNFT from '../../hook/useSacrificeNFT';
import { useNFTContext } from '../../hook/useNFTContext';
import useUpgradeNFT from '../../hook/useUpgradeNFT';
import FetchTokens from './fetch-tokens';

type NFTCardOverLayProps = {
  tokenId: number;
};
/**
 * NFTCardOverLay component for displaying overlay actions on an NFT card.
 * @param param0 - The props for the component.
 * @returns The rendered component.
 */
const NFTCardOverLay: FC<NFTCardOverLayProps> = ({ tokenId }) => {
  const { selectedForUpgrade } = useNFTContext();
  const { onSacrifice, isSacrificing } = useSacrificeNFT(tokenId);
  const { onUpgrade, isUpgraded } = useUpgradeNFT(selectedForUpgrade);

  return (
    <>
      {isUpgraded && <FetchTokens />}
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0,0,0,0.6)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        {selectedForUpgrade.length !== 2 && (
          <Typography
            color="#CACACA"
            fontWeight={500}
            fontSize="14px"
            marginBottom={2}
          >
            Select Two to Upgrade
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginBottom: 1,
            background: 'linear-gradient(#B30000 10%, #D01F27 90%)',
            '&:disabled': {
              background: '#5E5E5E',
              color: '#AFAFAF',
            },
          }}
          onClick={onUpgrade}
          disabled={selectedForUpgrade.length !== 2}
        >
          Upgrade
        </Button>
        {selectedForUpgrade.length !== 2 && (
          <Divider sx={{ backgroundColor: '#ffffff', width: '30%', my: 1 }} />
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginBottom: 2,
            marginTop: 1,
            background: 'linear-gradient(#B30000 10%, #D01F27 90%)',
            '&:disabled': {
              display: 'none',
            },
          }}
          onClick={onSacrifice}
          disabled={selectedForUpgrade.length === 2}
        >
          {isSacrificing ? 'Sacrificing...' : 'Sacrifice'}
        </Button>
      </Box>
    </>
  );
};

export default NFTCardOverLay;
