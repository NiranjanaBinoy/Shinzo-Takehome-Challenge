import React from 'react';
import { useAccount } from 'wagmi';
import { shortenAddress } from '../../helpers/utils';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * MenuHeader component displays the navigation buttons and user address.
 * @returns {JSX.Element} - The rendered component.
 */
const MenuHeader: React.FC = () => {
  const navigate = useNavigate();
  const { address } = useAccount();

  return (
    <>
      <button onClick={() => navigate('/')}>Mint</button>
      <button onClick={() => navigate('/collection')}>Collection</button>
      <Box
        sx={{
          fontFamily: 'Pixelify Sans, sans-serif',
          fontWeight: 700,
          marginTop: '0.75rem',
          color: 'white',
        }}
      >
        {address && shortenAddress(address)}
      </Box>
    </>
  );
};

export default MenuHeader;
