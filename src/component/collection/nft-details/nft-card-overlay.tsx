import { useState, type FC } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useNFTContext } from '../../../hook/useNFTContext';
import FetchTokens from '../nft-fetch/fetch-tokens';
import NFTSacrificeModal from './nft-sacrifice/nft-sacrifice-modal';
import NFTUpgradeModal from './nft-upgrade/nft-upgarde-modal';
import NFTTransferModal from './nft-transfer/nft-transfer-modal';

type NFTCardOverLayProps = {
  tokenId: number;
};
/**
 * NFTCardOverLay component for displaying overlay actions on an NFT card.
 * @param tokenId - The ID of the NFT.
 * @returns The rendered component.
 */
const NFTCardOverLay: FC<NFTCardOverLayProps> = ({ tokenId }) => {
  // state variables to control the modals
  const [isSacrificeModalOpen, setSacrificeModalOpen] =
    useState<boolean>(false);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState<boolean>(false);
  //state variables to manage the token display after upgarde and transfer
  const [isUpgradeCompleted, setIsUpgradeCompleted] = useState<boolean>(false);

  const { selectedForUpgrade } = useNFTContext();

  const handleSacrificeModalOpen = () => {
    setSacrificeModalOpen(true);
  };

  const handleSacrificeModalClose = () => {
    setSacrificeModalOpen(false);
  };

  const handleUpgradeModalOpen = () => {
    setUpgradeModalOpen(true);
  };

  const handleUpgradeModalClose = () => {
    setUpgradeModalOpen(false);
  };

  const handleTransferModalOpen = () => {
    setTransferModalOpen(true);
  };

  const handleTransferModalClose = () => {
    setTransferModalOpen(false);
  };

  return (
    <>
      {isUpgradeCompleted && <FetchTokens />}
      {isSacrificeModalOpen && (
        <NFTSacrificeModal
          openModal={isSacrificeModalOpen}
          onClose={handleSacrificeModalClose}
          tokenId={tokenId}
        />
      )}
      {isUpgradeModalOpen && (
        <NFTUpgradeModal
          openModal={isUpgradeModalOpen}
          onClose={handleUpgradeModalClose}
          tokenIds={selectedForUpgrade}
          setUpgradeCompleted={setIsUpgradeCompleted}
        />
      )}
      {isTransferModalOpen && (
        <NFTTransferModal
          openModal={isTransferModalOpen}
          onClose={handleTransferModalClose}
          tokenId={tokenId}
        />
      )}
      {/* Overlay Box */}
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
          sx={{
            marginBottom: 1,
            background: 'linear-gradient(.30turn, #FF0000, 50%, #990000)',
            '&:disabled': {
              background: '#5E5E5E',
              color: '#AFAFAF',
            },
          }}
          onClick={handleUpgradeModalOpen}
          disabled={selectedForUpgrade.length !== 2}
        >
          Upgrade
        </Button>
        {selectedForUpgrade.length !== 2 && (
          <Divider sx={{ backgroundColor: '#ffffff', width: '30%', my: 1 }} />
        )}
        <Button
          variant="contained"
          sx={{
            marginBottom: 1,
            marginTop: 1,
            background: 'linear-gradient(.30turn, #FF0000, 50%, #990000)',
            '&:disabled': {
              display: 'none',
            },
          }}
          onClick={handleSacrificeModalOpen}
          disabled={selectedForUpgrade.length === 2}
        >
          Sacrifice
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
            background: 'linear-gradient(.30turn, #FF0000, 50%, #990000)',
            '&:disabled': {
              display: 'none',
            },
          }}
          onClick={handleTransferModalOpen}
          disabled={selectedForUpgrade.length === 2}
        >
          Transfer
        </Button>
      </Box>
    </>
  );
};

export default NFTCardOverLay;
