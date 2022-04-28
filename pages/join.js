import WrapContainer from "../components/common/WrapContainer";
import Button from "../components/common/Button";

function Join() {
  return (
    <div className="contentWrapper">
      <img className="please-icon" src="img/please_icon.png" />
      <div className="join-text">커피가 필요한 개발자세요?</div>
      <div className="join-check">
        <input
          className="join-input"
          type="text"
          placeholder="이름을 입력해주세요"
          required
        />
        <Button text="중복조회" radius />
      </div>
      <Button text="등록하기" wide />
    </div>
  );
}

export default WrapContainer(Join);
