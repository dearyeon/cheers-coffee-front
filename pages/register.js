import * as React from "react";
import WrapContainer from "../components/common/WrapContainer";
import Button from "../components/common/Button";

function Register() {
  const [isUser, setIsUser] = React.useState(true);
  const [id, setId] = React.useState("");
  const [idCheck, setIdCheck] = React.useState(false);
  const [idBad, setIdBad] = React.useState(false);
  const [ment, setMent] = React.useState("");

  const checkingConditon = () => {
    //const check_id = /^[a-z0-9_-]{4,20}$/;
    //if (check_id.test(e.target.value)) setId(id.slice(0, -1));

    const regex = /^[a-z0-9+]{2,8}$/;
    if (regex.test(id)) {
      setMent("");
      setIdCheck(true);
    } else {
      setMent("2~8자의 영어 소문자, 숫자만 사용 가능합니다.");
      setIdBad(true);
    }
  };
  const checkingUser = () => {
    if (!idCheck) setMent("중복을 체크해주세요.");
    else if (idBad) setIsUser(false);
  };

  return (
    <div className="contentWrapper">
      <img className="please-icon" src="img/please.png" />
      {isUser ? (
        <>
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
            <Button
              text="중복조회"
              className="radius"
              onClick={checkingConditon}
            />
          </div>
          <div className="text-red">{ment}</div>
          <Button
            text="등록하기"
            className="join-button radius"
            onClick={checkingUser}
          />
        </>
      ) : (
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
    </div>
  );
}

export default WrapContainer(Register);
