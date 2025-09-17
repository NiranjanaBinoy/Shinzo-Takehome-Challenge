import type { FC } from 'react';
import { Box } from '@mui/material';
import type { NFTDetails } from '../../../../types/types';
import Sword from '../../../../assets/sword.svg';

type NFTUpgradeModalImageProps = {
  selectedTokens: NFTDetails[];
};

const NFTUpgradeModalImage: FC<NFTUpgradeModalImageProps> = ({
  selectedTokens,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '35%',
        left: '20%',
        display: 'flex',
        direction: 'row',
      }}
    >
      <img
        src={selectedTokens[0].tokenURI}
        alt="NFTs to upgrade"
        width={145}
        height={145}
      />
      <Box
        sx={{
          position: 'relative',
          left: '3%',
          right: '3%',
          display: 'flex',
          background: '#000000',
        }}
      >
        <hr
          style={{
            position: 'absolute',
            top: '45%',
            border: 'none',
            height: 3,
            backgroundColor: '#D01F27',
            width: 40,
          }}
        />
        <img
          src={Sword}
          alt="NFTs to upgrade"
          style={{
            margin: '0 60px 0 40px',
            width: '35%',
          }}
        />
        <hr
          style={{
            position: 'absolute',
            top: '45%',
            right: '10%',
            border: 'none',
            height: 3,
            backgroundColor: '#D01F27',
            width: 40,
          }}
        />
      </Box>
      <img
        src={selectedTokens[1].tokenURI}
        alt="NFTs to upgrade"
        width={145}
        height={145}
        style={{
          display: 'flex',
          position: 'absolute',
          left: '100%',
        }}
      />
    </Box>
  );
};

export default NFTUpgradeModalImage;
