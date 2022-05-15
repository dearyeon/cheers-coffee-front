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
        <title>치얼-쓰 커피</title>
        <link rel="shortcut icon" href="/favicon.ico" />
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
