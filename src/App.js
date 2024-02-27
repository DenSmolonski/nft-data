import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { reservoirChains } from '@reservoir0x/reservoir-sdk';
import { ReservoirKitProvider, darkTheme } from '@reservoir0x/reservoir-kit-ui';
import List from './components/NFTList';

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});
const theme = darkTheme({
  headlineFont: 'Sans Serif',
  font: 'Serif',
  primaryColor: '#323aa8',
  primaryHoverColor: '#252ea5',
});

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <ReservoirKitProvider
        options={{
          // apiKey: '',
          chains: [
            {
              ...reservoirChains.mainnet,
              active: true,
            },
          ],
        }}
        theme={theme}
      >
        <React.Fragment>
          <div className="flex justify-center">
            <div
              className="w-screen"
              style={{
                height: 'calc(100vh - 100px)',
              }}
            >
              <List />
            </div>
          </div>
        </React.Fragment>
      </ReservoirKitProvider>
    </WagmiProvider>
  );
}

export default App;
