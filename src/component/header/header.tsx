import Box from '@mui/material/Box';
import MenuHeader from './menu-header';
import ConnectWallet from './connect-wallet';
import { useNFTContext } from '../../hook/useNFTContext';
import LogoHeader from './logo/logo-header';

/**
 * Header component displays the logo, menu, and wallet connection button.
 * @returns {JSX.Element} - The rendered component.
 */
const Header = () => {
  const { isConnected } = useNFTContext();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <LogoHeader />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        {isConnected && <MenuHeader />}
        <ConnectWallet />
      </Box>
    </Box>
  );
};

export default Header;
