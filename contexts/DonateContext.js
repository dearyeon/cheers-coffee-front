import React, { useContext, useState, useEffect } from 'react';
import { ethers, signer } from 'ethers';
import donateABI from '../abi/Donate_abi.json';
import { useWeb3React } from '@web3-react/core';

let DonateContext = React.createContext(null);

const { Provider, Consumer: DonateConsumer } = DonateContext;

function DonateProvider({ children }) {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const { account, library } = useWeb3React();

  useEffect(() => {
    async function getSigner() {
      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        await provider.send("eth_requestAccounts", []);
        setSigner(provider.getSigner());
      } catch(err) {
        console.error(err);
      }
    }

    getSigner();
  }, []);

  useEffect(() => {
    if (window !== undefined && window.ethereum !== null && window.ethereum !== undefined) {
      try {
        const newContract = new ethers.Contract(
          "0x644b70F2E6Bf58B27B5aD5C2bbdd496Ba4482226", 
          donateABI.abi,
          signer
        );

        setContract(newContract);
      } catch(err) {
        console.error(err);
      }
    }
  }, [account, signer]);

  function checkNull() {
    if (contract === null) {
      console.error("contract is null!");
      return true;
    }

    if (account === null) {
      console.error("account is null!");
      return true;
    }

    return false;
  }

  const getRegistered = async (name) => {
    if (checkNull()) {
      throw 'contract or account is null';
    }

    try {
      let address = await contract.getRegistered(name, {});

      const emptyAddress = /^0x0+$/.test(address);

      return !emptyAddress;
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  const donate = async (name, ether) => {
    if (checkNull()) {
      return;
    }

    try {
      await contract.donate(name, { value: ether });
    } catch(err) {
      console.error(err);
    }
  }

  const register = async (name) => {
    if (checkNull()) {
      return;
    }

    try {
      const ret = await contract.register(name, account, {});
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <Provider value={{ getRegistered, donate, register }}>
      {children}
    </Provider>
  );
}

export default DonateContext;
export { DonateProvider, DonateConsumer };
export function useDonate() {
  return useContext(DonateContext);
}
