import { Box, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNFTContext } from '../../hook/useNFTContext';

/**
 * QuantitySelector component for selecting the mint quantity
 * @param param0 - Props for the QuantitySelector component
 * @returns QuantitySelector JSX
 */
const QuantitySelector = () => {
  const { quantity, handleDecrement, handleIncrement } = useNFTContext();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingX: 1,
        paddingY: 0.5,
        bgcolor: '#252525',
      }}
    >
      <IconButton
        size="medium"
        sx={{ bgcolor: '#222', color: '#fff' }}
        onClick={handleDecrement}
      >
        <RemoveIcon />
      </IconButton>
      <Typography variant="h6" color="#fff">
        {quantity}
      </Typography>
      <IconButton
        size="medium"
        sx={{ bgcolor: '#222', color: '#fff' }}
        onClick={handleIncrement}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};
export default QuantitySelector;
