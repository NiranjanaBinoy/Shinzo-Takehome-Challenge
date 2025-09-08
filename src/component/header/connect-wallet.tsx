import { Box } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CircleUser from '../../assets/circle-user-round-1.svg';
import { useNFTContext } from '../../hook/useNFTContext';

/**
 * ConnectWallet component displays the wallet connection button using rainbowkit.
 * @returns {JSX.Element} - The rendered component.
 */
const ConnectWallet = () => {
  const { isConnected } = useNFTContext();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ConnectButton
        accountStatus="avatar"
        showBalance={false}
        chainStatus="none"
      />
      {!isConnected && <img src={CircleUser} alt="User Avatar" />}
    </Box>
  );
};

export default ConnectWallet;
