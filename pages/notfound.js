import * as React from "react";
import WrapContainer from "../components/common/WrapContainer";
import Button from "../components/common/Button";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();

  return (
    <div className="contentWrapper">
      <img className="please-icon" src="img/please.png" />
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
  );
}

export default WrapContainer(Register);
