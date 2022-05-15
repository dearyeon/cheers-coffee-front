import React, {useState, useMemo} from 'react';
import { useRouter } from 'next/router'
import useSWR from "swr";

import Cheers from "../../components/container/Cheers";
import Please from "../../components/container/Please";
import Credit from "../../components/container/Credit";
import Button from "../../components/common/Button";
import { useDonate } from '../../contexts/DonateContext';

const UserPage = () => {
  const router = useRouter()
  const { name } = router.query;
  const { getRegistered} = useDonate();
  const [count, setCount] = React.useState(1);
  const [userChecked, setUserChecked] = useState(false);

  const fetcher = async (...args) => {
    let isRegistered = false;
    const [name] = args;

    if (args === null) {
      return null;
    }

    try {
      isRegistered = await getRegistered(name);
      
      setUserChecked(true);

      return isRegistered
    } catch (err) {
      console.error(err);
    }

    return isRegistered;
  };
  
  const { data: isRegistered } = useSWR(name, fetcher);

  const state = useMemo(() => {
    if (!userChecked) {
      return 'wait';
    }

    return isRegistered ? 'user' : 'notfound'
  }, [userChecked, isRegistered])

  return (
    <>
      {state === 'wait' && (
        <>please wait</>
      )}
      {state === 'user' && (
        <div className="wrapper">
          <Cheers count={count} setCount={setCount} />
          <Please />
          <Credit />
        </div>
      )}
      {state === 'notfound' && (
        <>
          <div className="join-text">
            그런 개발자는 여기 없습니다
            <br />그 커피는 저한테 주시죠
          </div>
          <Button
            text="사이트 개발자에게 커피 주기"
            className="join-button radius"
          />
        </>
      )}
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { query } = context;
  const { name } = query;
  
  return {
    props: {
      name,
    },
  };
};

export default UserPage;
