import { useEffect, type FC } from 'react';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { TokenId } from '../../../../types/types';
import { useNFTContext } from '../../../../hook/useNFTContext';
import Group28 from '../../../../assets/group-28.svg';
import useSacrificeNFT from '../../../../hook/useSacrificeNFT';

type NFTSacrificeModalProps = {
  openModal: boolean;
  onClose: () => void;
  tokenId: TokenId;
};

const NFTSacrificeModal: FC<NFTSacrificeModalProps> = ({
  openModal,
  onClose,
  tokenId,
}) => {
  const { state, userAddress, chainId } = useNFTContext();
  const token = state.activeNftDetails[userAddress]?.[chainId]?.find(
    (nft) => nft.tokenId === tokenId
  );
  const { onSacrifice, isSacrificing, isSacrificed } = useSacrificeNFT(tokenId);

  useEffect(() => {
    if (isSacrificed) {
      onClose();
    }
  }, [isSacrificed, onClose]);

  return (
    <Modal open={openModal} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 750,
          height: 450,
          bgcolor: '#000000',
          borderStyle: 'solid',
          borderWidth: 12,
          borderColor: '#252525',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#fff',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h3"
          sx={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Pixelify Sans',
            fontWeight: 700,
            fontStyle: 'bold',
            fontSize: '30px',
          }}
        >
          Sacrifice
        </Typography>
        <Typography
          sx={{
            position: 'absolute',
            top: '20%',
            left: '11%',
            fontWeight: 500,
            fontStyle: 'medium',
            fontSize: '12px',
            color: '#808080',
          }}
        >
          Burn this warrior, he will not be forgotten!
        </Typography>
        <img
          src={Group28}
          alt="Shinzo"
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '2%',
            borderRadius: '8px',
          }}
        />
        <Box>
          <img
            src={token?.tokenURI}
            alt="NFT to Sacrifice"
            width={145}
            height={145}
            style={{
              position: 'absolute',
              top: '30%',
              left: '40%',
              borderRadius: '8px',
            }}
          />
          <Button
            onClick={onSacrifice}
            variant="contained"
            sx={{
              position: 'absolute',
              top: '75%',
              left: '40%',
              paddingX: 5,
              background: 'linear-gradient(.30turn, #FF0000, 50%, #990000)',
            }}
          >
            {isSacrificing ? 'Sacrificing...' : 'Sacrifice'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NFTSacrificeModal;
