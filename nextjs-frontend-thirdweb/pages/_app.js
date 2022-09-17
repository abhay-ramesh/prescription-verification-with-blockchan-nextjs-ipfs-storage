import { ChainId, ThirdwebProvider, ConnectWallet, useAddress } from '@thirdweb-dev/react';
import AuthWrap from '../components/wrappers/authWrap';
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Rinkeby;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <AuthWrap Component={Component} pageProps={pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp
