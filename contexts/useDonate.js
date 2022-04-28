import React, { useContext } from 'react';
import { ethers } from 'ethers';
import donateABI from '../abi/Donate_abi.json';

let DonateContext = React.createContext(null);

const { Provider, Consumer: DonateConsumer } = DonateContext;

function DonateProvider({ children }) {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum !== null && window.ethereum !== undefined) {
      try {
        const newContract = new ethers.Contract(
          "0x644b70F2E6Bf58B27B5aD5C2bbdd496Ba4482226", 
          donateABI.abi,
          library
        );

        setContract(newContract);
      } catch(err) {
        console.error(err);
      }
    }
  }, [window.ethereum]);

  const getRegistered = async (name) => {
    if (contract === null) {
      console.error("contract is null!");
      return;
    }

    try {
      let address = await contract.getRegistered("goldfish", {});

      return address !== 0;
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <Provider value={{ getRegistered }}>
      {children}
    </Provider>
  );
}

export default DonateContext;
export { DonateProvider, DonateConsumer };
export function useDonate() {
  return useContext(DonateContext);
}
