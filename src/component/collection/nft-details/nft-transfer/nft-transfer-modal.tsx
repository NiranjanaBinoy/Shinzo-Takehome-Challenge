import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { useEffect, useState, type ChangeEvent, type FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { type Address, type NFTDetails } from '../../../../types/types';
import { useNFTContext } from '../../../../hook/useNFTContext';
import Group28 from '../../../../assets/group-28.svg';
import useNFTTransfer from '../../../../hook/useNFTTransfer';

type NFTTransferModalProps = {
  openModal: boolean;
  onClose: () => void;
  tokenId: number;
};
/**
 * NFTTransferModal component for transferring an NFT.
 * @param openModal - Boolean to control modal visibility.
 * @param onClose - Function to handle modal close action.
 * @param tokenId - The ID of the NFT to be transferred.
 * @returns The rendered component.
 */
const NFTTransferModal: FC<NFTTransferModalProps> = ({
  openModal,
  onClose,
  tokenId,
}) => {
  const { state, userAddress, chainId } = useNFTContext();
  const [toAddress, setToAddress] = useState<Address>('0x');

  const { onTransfer, isTransfered, isTransfering } = useNFTTransfer({
    toAddress,
    tokenId,
  });

  const token = state.activeNftDetails[userAddress]?.[chainId]?.find(
    (nft: NFTDetails) => nft.tokenId === tokenId
  );

  const handleToAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToAddress(e.target.value as Address);
  };

  useEffect(() => {
    if (isTransfered) {
      onClose();
    }
  }, [isTransfered, onClose]);

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
          borderWidth: 12,
          borderStyle: 'solid',
          borderColor: '#252525',
          bgcolor: '#000000',
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
          Transfer
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
          Transfer the warrior to another wallet.
        </Typography>
        <img
          src={Group28}
          alt="Decorative"
          style={{
            position: 'absolute',
            top: '55%',
            left: '2%',
          }}
        />
        {/* NFT Image */}
        <img
          src={token?.tokenURI}
          alt="Transfer Warrior"
          style={{
            position: 'absolute',
            top: '47%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '150px',
          }}
        />
        <Box sx={{ position: 'absolute', top: '75%', width: '100%' }}>
          <input
            id="toAddress"
            name="toAddress"
            placeholder="Enter recipient address"
            onChange={handleToAddressChange}
            style={{
              position: 'absolute',
              top: '5%',
              left: '45%',
              width: '300px',
              padding: '12px',
              color: '#FFFFFF',
              backgroundColor: '#1A1A1A',
              border: '1px solid #333333',
              borderRadius: '8px',
              fontSize: '14px',
              transform: 'translateX(-50%)',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '68%',
              marginTop: '2px',
              paddingX: 4,
              background: 'linear-gradient(.30turn, #FF0000, 50%, #990000)',
              color: '#FFFFFF',
            }}
            onClick={onTransfer}
          >
            {isTransfering ? 'Transfering...' : 'Transfer'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NFTTransferModal;
