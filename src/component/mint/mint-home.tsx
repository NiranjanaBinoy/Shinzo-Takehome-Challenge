import { Box } from '@mui/material';
import ImageGallery from './image-gallary';
import MintPanel from './mint-panel';

const MintHome = () => {
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
