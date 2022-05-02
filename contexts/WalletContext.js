import React, { useContext, useState, useEffect } from 'react';

import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

let WalletContext = React.createContext(null);

const { Provider, Consumer: WalletConsumer } = WalletContext;

function WalletProvider({ children }) {
  const [connector, setConnector] = useState(null);

  // useWeb3React: @web3-react에서 제공하는 훅
  // chainId: 현재 지갑에 연결된 체인 Id
  // account: 연결된 계좌 주소
  // activate: 연결 실행 함수
  // active: 현재 연결된 상태인지 표시
  // library: 여러가지 함수를 호출할 수 있는 플러그인
  const { chainId, account, activate, active, library } = useWeb3React();

  useEffect(() => {
    if (connector === null) {
      // supportedChainIds: 접속할 서버들
      // https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID/
      // 1: Mainnet (Production), 3: Ropsten (Test), 4: Rinkeby (Test), 5: Georli (Test), 42: Kovan (Test)
      setConnector(new InjectedConnector({ supportedChainIds: [1, 3] }));
    }
  }, [connector]);

  function connectWallet() {
    if (connector !== null) {
      activate(connector);
    }
  }

  return (
    <Provider value={{ connectWallet }}>
      {children}
    </Provider>
  );
}

export default WalletContext;
export { WalletProvider, WalletConsumer };
export function useWallet() {
  return useContext(WalletContext);
}
