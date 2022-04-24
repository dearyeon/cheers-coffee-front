import * as React from "react";
import Button from "../components/Button";

function Main() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="wrapper">
      <div className="container" style={{ background: "lightgray" }}>
        <div className="main-imgboxWrapper">
          <div className="main-imgbox">
            <Button text="커피로 응원하기" />
          </div>
        </div>
      </div>
      <div className="container">test</div>
    </div>
  );
}

export default Main;
