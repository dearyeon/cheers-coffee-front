import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import useSWR from 'swr';


const ConnectWallet = () => {
  // balance: 현재 자산을 기록하는 스테이트.
  const [balance, setBalance] = useState("");

  const onClick = () => {
    // 버튼 클릭 시, 지갑 연결
    activate(injectedConnector);
  };

  useEffect(() => {
    // 스테이트 업데이트 될 때마다 상태 로깅
    console.log(chainId, account, active);
  });

  useEffect(() => {
    // 주기적으로 잔고를 가져옴.
    library?.getBalance(account).then((result) => {
      setBalance(result / 1e18);
    });
  });

  // SWR을 이용해 패칭할 때 이용할 패쳐
  const fetcher = (library) => (...args) => {
    // ['getBalance', account, 'latest']
    // getBalance -> method
    // account, 'latest' -> args
    // getBalance(account, 'latest');
    const [method, ...params] = args;

    console.log("fetcher", method, params);

    const result = library[method](...params);
    return result;
  };

  const BalanceSWR = () => {
    const { account, library } = useWeb3React();
    // data로 받았지만 balance로 이름을 바꿔서 사용
    // mutate: ??? 조사 필요
    const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
      fetcher: fetcher(library),
    });

    useEffect(() => {
      // listen for changes on an Ethereum address
      console.log(`listening for blocks...`);

      // 블록이 업데이트 되면 (새로운 블록이 생기면) 자산을 업데이트 함.
      library.on('block', () => {
        console.log('update balance...');
        mutate(undefined, true);
      });

      // remove listener when the component is unmounted
      return () => {
        library.removeAllListeners('block');
      };

      // trigger the effect only on component mount
    }, []);

    console.log(balance);

    if (!balance) {
      return <div>...</div>;
    }
    
    return <div>Balance: Ξ {balance / 1e18}</div>;
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      <div>Balance: {balance}</div>
      {active && <BalanceSWR />}
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect Connect
        </button>
      )}
      {/* <button onClick={handleClickDonate}>
        Call Donate
      </button> */}
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
