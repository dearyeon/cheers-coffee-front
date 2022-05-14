import '../styles/globals.css'

import Head from 'next/head';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { DonateProvider } from '../contexts/DonateContext';
import { WalletProvider } from '../contexts/WalletContext';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Sunflower&display=swap" rel="stylesheet" />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletProvider>
          <DonateProvider>
            <Component {...pageProps} />
          </DonateProvider>
        </WalletProvider>
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
