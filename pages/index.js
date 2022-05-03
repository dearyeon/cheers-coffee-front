import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useWeb3React } from '@web3-react/core';
import { useDonate } from '../contexts/DonateContext';

const ConnectWallet = () => {
  const { connectWallet } = useWallet();
  const { chainId, account, active, library } = useWeb3React();
  const { getRegistered, donate, register } = useDonate();
  const [newName, setNewName] = useState("");

  // balance: 현재 자산을 기록하는 스테이트.
  const [balance, setBalance] = useState("");

  // TODO: Delete
  useEffect(() => {
    // 스테이트 업데이트 될 때마다 상태 로깅
    // console.log(chainId, account, active);
  });

  useEffect(() => {
    // 주기적으로 잔고를 가져옴.
    library?.getBalance(account).then((result) => {
      setBalance(result / 1e18);
    });
  });

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      <div>Balance: {balance}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <>
          <button type="button" onClick={connectWallet}>
            Connect Connect
          </button>
        </>
      )}
      <button type="button" onClick={() => getRegistered("goldfish")}>
        Check Goldfish Exist
      </button>
      <button type="button" onClick={() => donate("goldfish", 1 * 1e12)}>
        Donate
      </button>
      <div>
        <input value={newName} onChange={e => setNewName(e.target.value)} />
        <button type="button" onClick={() => register(newName)}>
          Register
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <main className={styles.main}>
        <h2>Welcome to playground</h2>
        <ConnectWallet />
      </main>
    </div>
  );
};

export default Home;
