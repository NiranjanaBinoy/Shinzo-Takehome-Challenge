import { type FC } from 'react';
import { Box, Typography, Button, Grid, Divider } from '@mui/material';
import QuantitySelector from './quantity-selector';
import Group28 from '../../assets/group-28.svg';
import { SHINZO_TOKEN_CONTRACT_ADDRESS } from '../../constant/contract';
import { useNFTContext } from '../../hook/useNFTContext';
import { ABI } from '../../abi';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

/**
 * MintPanel component for minting NFTs
 * @returns MintPanel JSX
 */
const MintPanel: FC = () => {
  const { userAddress, quantity } = useNFTContext();
  const { data: hash, writeContract } = useWriteContract();

  async function onSubmit() {
    writeContract({
      address: SHINZO_TOKEN_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'mint',
      args: [userAddress, quantity],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bgcolor="#101010"
      border={12}
      borderColor="#252525"
      borderRadius={2}
      boxShadow={8}
      minWidth={750}
      minHeight={400}
      padding={4}
    >
      <Typography
        variant="h3"
        fontFamily="Pixelify Sans, sans-serif"
        fontWeight={700}
        fontSize={30}
        color="#FFFFFF"
        align="left"
      >
        Mint
      </Typography>
      <Divider sx={{ borderColor: '#252525', marginTop: 2, marginBottom: 2 }} />
      <Typography variant="h5" fontSize={20} color="#FFFFFF" align="left">
        {quantity} NFTs
      </Typography>
      <Typography
        variant="body1"
        fontSize={12}
        color="#808080"
        marginBottom={3}
        align="left"
      >
        {quantity * 0.05} ETH
      </Typography>
      <Divider sx={{ borderColor: '#252525', marginTop: 2, marginBottom: 2 }} />
      <Grid container marginTop={3}>
        <img src={Group28} alt="Shinzo" />
        <Box
          sx={{
            position: 'absolute',
            top: '57%',
            right: '0',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'row',
            margin: 10,
            paddingLeft: 4,
          }}
        >
          <QuantitySelector />
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{
              background: 'linear-gradient(.30turn, #FF0000, 50%, #990000)',
              color: '#FFFFFF',
              paddingX: 7,
              fontSize: 16,
              fontWeight: 700,
              marginLeft: 3,
            }}
          >
            {isConfirming ? 'Minting...' : isConfirmed ? 'Minted' : 'Mint'}
          </Button>
        </Box>
      </Grid>
      {isConfirmed && (
        <Typography
          variant="body1"
          fontSize={12}
          color="#808080"
          marginBottom={3}
          align="left"
        >
          NFT Minted!
        </Typography>
      )}
    </Box>
  );
};

export default MintPanel;
