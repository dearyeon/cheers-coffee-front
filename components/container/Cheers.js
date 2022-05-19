import WrapContainer from "../common/WrapContainer";
import ScrollIcon from "../common/ScrollIcon";
import Button from "../common/Button";
import { useDonate } from "../../contexts/DonateContext";

function Cheers({ name, count, setCount }) {
  const { donate } = useDonate();

  const calCount = (action) => {
    if (action == "plus" && count < 100) setCount(count + 1);
    if (action == "minus" && count > 1) setCount(count - 1);
  };

  const ment = `Oh my... 지친 개발자 ${name}에게
  커피를 사주는 당신의 눈동자에
  치 ★ 얼 ☆ 쓰 -
  `;

  const handleDonate = () => {
    donate(name, 1e15 * count);
  }

  return (
    <div className="contentWrapper cheers">
      <div className="ment cheers">{ment}</div>
      <div className="cheers-content">
        <img className="cheers-icon" src="../img/cheers.png" />
        <div className="cheers-coffeCount1">
          <img className="coffee-icon" src="../img/coffee.png" />
          <div className="cheers-coffeCount1-text">X {count}</div>
        </div>
        <div className="cheers-coffeCount2">
          <div className="cheers-coffeCount2-text">
            {count}커피 = {(0.01 * count).toFixed(2)}ether
          </div>
        </div>
        <div className="cheers-countButton">
          <Button
            className="button-icon lightskyblue"
            text="−"
            onClick={() => calCount("minus")}
          />
          <div>{count}</div>
          <Button
            text="+"
            className="button-icon pink"
            onClick={() => calCount("plus")}
          />
        </div>
        <div className="cheers-registerButton">
          <Button onClick={handleDonate} text="커피로 응원하기" className="wide" />
        </div>
      </div>

      <ScrollIcon />
    </div>
  );
}

export default WrapContainer(Cheers);
