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
      console.log(signer)
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

  useEffect(() => {
    console.log(contract)
  }, [contract])

  const getRegistered = async (name) => {
    if (contract === null) {
      console.error("contract is null!");
      return;
    }

    if (account === null) {
      console.error("account is null!");
      return;
    }

    try {
      let address = await contract.getRegistered(name, {});

      return address !== 0;
    } catch(err) {
      console.error(err);
    }

    return false;
  }

  const donate = async (name, ether) => {
    if (contract === null) {
      console.error("contract is null!");
      return;
    }

    if (account === null) {
      console.error("account is null!");
      return;
    }

    try {
      await contract.donate(name, { value: ether });
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <Provider value={{ getRegistered, donate }}>
      {children}
    </Provider>
  );
}

export default DonateContext;
export { DonateProvider, DonateConsumer };
export function useDonate() {
  return useContext(DonateContext);
}
