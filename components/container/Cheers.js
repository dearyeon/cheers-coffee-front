import WrapContainer from "../common/WrapContainer";
import ScrollIcon from "../common/ScrollIcon";
import Button from "../common/Button";

function Cheers({ count, setCount }) {
  const calCount = (action) => {
    if (action == "plus" && count < 100) setCount(count + 1);
    if (action == "minus" && count > 1) setCount(count - 1);
  };
  return (
    <div className="contentWrapper cheers">
      <div className="ment cheers">{ment(count)}</div>
      <div className="cheers-content">
        <img className="cheers-icon" src="img/cheers_test.png" />
        <div className="cheers-coffeCount1">
          <img className="coffee-icon" src="img/coffee_test.png" />
          <div className="cheers-coffeCount1-text">X {count}</div>
        </div>
        <div className="cheers-coffeCount2">
          <div className="cheers-coffeCount2-text">
            {count}커피 = {(0.01 * count).toFixed(2)}ether
          </div>
        </div>
        <div className="cheers-countButton">
          <Button
            text="−"
            color="lightskyblue"
            icon
            onClick={() => calCount("minus")}
          />
          <Button text={count} wide />
          <Button text="+" color="pink" icon onClick={() => calCount("plus")} />
        </div>
        <div className="cheers-registerButton">
          <Button text="커피로 응원하기" wide />
        </div>
      </div>

      <ScrollIcon />
    </div>
  );
}

const ment = (count) =>
  `Oh my... 지친 개발자 ${count}에게
커피를 사주는 당신의 눈동자에
치 ★ 얼 ☆ 쓰 -
`;

export default WrapContainer(Cheers);
