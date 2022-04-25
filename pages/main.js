import * as React from "react";
import Button from "../components/Button";

function Main() {
  const [count, setCount] = React.useState(1);

  return (
    <div className="wrapper">
      <div className="container" style={{ background: "lightgray" }}>
        <div className="main-contentWrapper">
          <div className="main-ment">
            Oh my... 지친 개발자 {count}에게
            <br />
            커피를 사주는 당신의 눈동자에
            <br />치 ★ 얼 ☆ 쓰 -
          </div>
          <div className="main-content">
            <img className="cheers-icon" src="img/cheers_test.png" />
            <div className="main-coffeCount1">
              <img className="coffee-icon" src="img/coffee_test.png" />
              <div className="main-coffeCount1-text">X {count}</div>
            </div>
            <div className="main-coffeCount2">
              <div className="main-coffeCount2-text">
                {count}커피 = {0.01 * count}ether
              </div>
            </div>
            <Button text="커피로 응원하기" />
          </div>
        </div>
      </div>
      <div className="container">test</div>
    </div>
  );
}

export default Main;
