import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

/**
 * Wagmi configuration for the Shinzo app
 */
export const config = getDefaultConfig({
  appName: 'Shinzo',
  projectId: '998ff861d05643cbbc5438d5f7479d8c', // INFURA_Project_ID
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
