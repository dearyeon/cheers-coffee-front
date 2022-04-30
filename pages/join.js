import * as React from "react";
import WrapContainer from "../components/common/WrapContainer";
import Button from "../components/common/Button";

function Join() {
  const [isGood, setIsGood] = React.useState(true);
  return (
    <div className="contentWrapper">
      <img className="please-icon" src="img/please_icon.png" />
      {isGood ? (
        <>
          <div className="join-text">커피가 필요한 개발자세요?</div>
          <div className="join-check">
            <input
              className="join-input radius"
              type="text"
              placeholder="이름을 입력해주세요"
              required
            />
            <Button text="중복조회" className="radius" />
          </div>
          <Button
            text="등록하기"
            className="join-button radius"
            onClick={() => setIsGood(!isGood)}
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

export default WrapContainer(Join);
