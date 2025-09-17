import { useEffect, type FC } from 'react';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNFTContext } from '../../../../hook/useNFTContext';
import Group28 from '../../../../assets/group-28.svg';
import NFTUpgradeModalImage from './nft-upgrade-modal-image';
import useUpgradeNFT from '../../../../hook/useUpgradeNFT';

type NFTUpgradeModalProps = {
  openModal: boolean;
  onClose: () => void;
  tokenIds: number[];
  setUpgradeCompleted: (_: boolean) => void;
};

const NFTUpgradeModal: FC<NFTUpgradeModalProps> = ({
  openModal,
  onClose,
  tokenIds,
  setUpgradeCompleted,
}) => {
  const { state, userAddress, chainId, handleUpgradeSelection } =
    useNFTContext();
  const { onUpgrade, isUpgrading, isUpgraded } = useUpgradeNFT(tokenIds);

  const selectedTokens =
    state.activeNftDetails[userAddress]?.[chainId]?.filter((token) =>
      tokenIds.includes(token.tokenId)
    ) || [];

  useEffect(() => {
    if (isUpgraded) {
      handleUpgradeSelection([]);
      onClose();
      setUpgradeCompleted(true);
    }
  }, [isUpgraded, onClose, setUpgradeCompleted, handleUpgradeSelection]);

  return (
    <Modal open={openModal} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 760,
          height: 460,
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
            fontFamily: 'Pixelify Sans, sans-serif',
            fontWeight: 700,
            fontStyle: 'bold',
            fontSize: '30px',
          }}
        >
          Upgrade!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            position: 'absolute',
            top: '20%',
            left: '11%',
            fontSize: 12,
            fontWeight: 500,
            color: '#808080',
          }}
        >
          Merge forces and sacrifice these warriors to upgrade.
        </Typography>
        <Box>
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
          <NFTUpgradeModalImage selectedTokens={selectedTokens} />
          <Button
            onClick={onUpgrade}
            sx={{
              position: 'absolute',
              top: '80%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              paddingX: 5,
              background: 'linear-gradient(.30turn, #FF0000, 50%, #990000)',
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {isUpgrading ? 'Upgrading...' : 'Upgrade!'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NFTUpgradeModal;
