import * as React from "react";
import { useRouter } from "next/router";
import WrapContainer from "../components/common/WrapContainer";
import Button from "../components/common/Button";
import { useDonate } from "../contexts/DonateContext";

function Register() {
  const router = useRouter();
  const [isAble, setIsAble] = React.useState(false);
  const [id, setId] = React.useState("");
  const [ment, setMent] = React.useState("");
  const { register, getRegistered } = useDonate();

  const checkingConditon = async () => {
    const regex = /^[a-z0-9+]{2,8}$/;

    if (regex.test(id)) {
      setMent("확인 중입니다");

      const res = await getRegistered(id);

      if (!res) {
        setIsAble(true);
        setMent("사용 가능한 아이디입니다.");
      } else {
        setMent("이미 있는 아이디입니다.");
      }
    } else {
      setMent("2~8자의 영어 소문자, 숫자만 사용 가능합니다.");
    }
  };

  const checkingUser = async () => {
    if (!isAble) {
      setMent("중복을 체크해주세요.");
    } else {
      const res = await register(id);

      if (res) {
        router.push(`/user/${id}`);
      }
    }
  };

  return (
    <div className="contentWrapper">
      <img className="large-icon" src="img/please.png" />
      <div className="join-text">커피가 필요한 개발자세요?</div>
      <div className="join-check">
        <input
          className="join-input radius"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="이름을 입력해주세요"
          required
        />
        <Button text="중복조회" className="radius" onClick={checkingConditon} />
      </div>
      <div className={isAble ? "text-blue" : "text-red"}>{ment}</div>
      <Button
        text="등록하기"
        className="join-button radius"
        onClick={checkingUser}
      />
    </div>
  );
}

export default WrapContainer(Register);
