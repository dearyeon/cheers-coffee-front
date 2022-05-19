import React, { useState, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import Cheers from "../../components/container/Cheers";
import Please from "../../components/container/Please";
import Credit from "../../components/container/Credit";
import Button from "../../components/common/Button";
import { useDonate } from '../../contexts/DonateContext';
import Waiting from '../../components/common/Waiting';

const UserPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const { getRegistered } = useDonate();
  const [count, setCount] = React.useState(1);
  const [userChecked, setUserChecked] = useState(false);
  const isLoading = useRef(false);

  const fetcher = async (...args) => {
    let isRegistered = false;
    const [name] = args;

    if (userChecked) {
      return userChecked;
    }

    if (args === null || isLoading.current) {
      return null;
    }

    try {
      isLoading.current = true;
      isRegistered = await getRegistered(name);

      setUserChecked(true);
      isLoading.current = false;

      return isRegistered;
    } catch (err) {
      isLoading.current = false;
      console.error(err);
    }

    return isRegistered;
  };

  const { data: isRegistered } = useSWR(name, fetcher, { refreshInterval: 300 });

  const state = useMemo(() => {
    if (!userChecked) {
      return 'wait';
    }

    return isRegistered ? 'user' : 'notfound'
  }, [userChecked, isRegistered])

  return (
    <>
      {state === 'wait' && (
        <Waiting />
      )}
      {state === 'user' && (
        <div className="wrapper">
          <Cheers name={name} count={count} setCount={setCount} />
          <Please />
          <Credit />
        </div>
      )}
      {state === "notfound" && (
        <div className="contentWrapper">
          <img className="please-icon" src="/img/please.png" />
          <div className="join-text">
            그런 개발자는 여기 없습니다
            <br />그 커피는 저한테 주시죠
          </div>
          <Button
            text="사이트 개발자에게 커피 주기"
            className="join-button radius"
            onClick={() => router.push("/user/goldfish")}
          />
        </div>
      )}
    </>
  );
};

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
