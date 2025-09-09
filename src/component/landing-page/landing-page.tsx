import type { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Image4 from '../../assets/image-4.svg';
import Group28 from '../../assets/group-28.svg';

const LandingPage: FC = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '7%',
        left: '5%',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '30%',
          width: 450,
          height: 335,
          backgroundColor: '#000000',
          borderStyle: 'solid',
          borderWidth: 12,
          borderColor: '#252525',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '37%',
          left: '45%',
          width: 450,
          height: 330,
          backgroundColor: '#000000',
        }}
      >
        {openConnectModal && (
          <Button
            onClick={openConnectModal}
            variant="contained"
            sx={{
              position: 'absolute',
              bottom: '5%',
              left: '30%',
              paddingX: 6,
              paddingY: 1.5,
              marginTop: 2,
              background: 'linear-gradient(.30turn, #FF0000, 50%, #990000)',
            }}
          >
            Connect
          </Button>
        )}
      </Box>
      <img
        src={Image4}
        alt="Samurai"
        style={{
          position: 'absolute',
          top: '46%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          height: '60%',
          width: '60%',
        }}
      />
      <Typography
        fontFamily="Pixelify Sans, sans-serif"
        fontWeight={700}
        fontSize="50px"
        width="40%"
        marginTop={12}
        align="left"
        sx={{
          position: 'absolute',
          top: '40%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        Welcome to the Shinzo Dojo Takehome Challenge!
      </Typography>
      <img
        src={Group28}
        alt="Shinzo"
        style={{
          position: 'absolute',
          top: '70%',
          left: '25%',
          borderRadius: '8px',
        }}
      />
    </Box>
  );
};

export default LandingPage;
