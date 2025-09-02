import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import NFTContextProvider from './context/nftContextProvider.tsx';
import { config } from './wagmi.ts';

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NFTContextProvider>
          <RainbowKitProvider
            modalSize="compact"
            theme={darkTheme({
              accentColor: '#000000',
              accentColorForeground: '#ffffff',
            })}
            initialChain={sepolia}
          >
            {children}
          </RainbowKitProvider>
        </NFTContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
