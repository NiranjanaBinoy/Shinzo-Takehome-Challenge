import { Box } from '@mui/material';
import ImageGallery from './image-gallary';
import MintPanel from './mint-panel';
import { useEffect } from 'react';
import { useNFTContext } from '../../hook/useNFTContext';

const MintHome = () => {
  const { userAddress, resetQuantity } = useNFTContext();
  useEffect(() => {
    // Reset quantity when the component mounts
    return resetQuantity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  return (
    <Box
      display="flex"
      minHeight="100vh"
      bgcolor="#000000"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginRight={1}
      >
        <ImageGallery />
      </Box>
      <MintPanel />
    </Box>
  );
};

export default MintHome;
