import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

const ConnectWallet = () => {
  const injectedConnector = new InjectedConnector({supportedChainIds: [1,3, 4, 5, 42, ],})
  const { chainId, account, activate, active,library } = useWeb3React()
  const [balance,setBalance]= useState("")
  
  const onClick = () => {
    activate(injectedConnector)
  }

  useEffect(() => {
    console.log(chainId, account, active)
    },);

  useEffect(() => {
    library?.getBalance(account).then((result)=>{
      setBalance(result/1e18)
    })
    },);

    const fetcher = (library) => (...args) => {
      const [method, ...params] = args
      console.log("fetcher",method, params)
      const result = library[method](...params)
     return library[method](...params)
    }

    const BalanceSWR  = () => {
      const { account, library } = useWeb3React()
      const { data: balance, mutate  } = useSWR(['getBalance', account, 'latest'], {
        fetcher: fetcher(library),
      })
      useEffect(() => {
        // listen for changes on an Ethereum address
        console.log(`listening for blocks...`)
        library.on('block', () => {
          console.log('update balance...')
          mutate(undefined, true)
        })
        // remove listener when the component is unmounted
        return () => {
          library.removeAllListeners('block')
        }
        // trigger the effect only on component mount
      }, [])

      console.log(balance)
      if(!balance) {
        return <div>...</div>
      }
      return <div>Balance: Ξ {balance/1e18}</div>
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
    </div>
  )
}

const Home = () => {
  return (
    <div >
      <main className={styles.main}>
        <h2 >Welcome to playground</h2>
        <ConnectWallet />
      </main>
    </div>
  )
}

export default Home