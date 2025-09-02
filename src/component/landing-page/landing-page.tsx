import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import Image4 from '../../assets/image-4.svg';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const LandingPage = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <Box sx={{ width: '100%', display: 'flex', textAlign: 'left', padding: 2 }}>
      <Card sx={{ margin: 10, backgroundColor: '#000000' }}>
        <CardMedia
          component="img"
          height="460"
          image={Image4}
          alt="Samurai"
          sx={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </Card>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          fontFamily="Pixelify Sans, sans-serif"
          fontWeight={700}
          fontSize="60px"
          width="90%"
          marginTop={12}
        >
          Welcome to the Shinzo Dojo Takehome Challenge!
        </Typography>
        {openConnectModal && (
          <Button
            onClick={openConnectModal}
            variant="contained"
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              marginTop: 2,
              background: 'linear-gradient(#B30000 0%, #D01F27 100%)',
            }}
          >
            Connect
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default LandingPage;
