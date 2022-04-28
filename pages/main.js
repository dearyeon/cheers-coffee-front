import { addRequestMeta } from "next/dist/server/request-meta";
import * as React from "react";
import Cheers from "../components/main/Cheers";

function Main() {
  const [count, setCount] = React.useState(1);

  return (
    <div className="wrapper">
      <div className="container">
        <Cheers count={count} setCount={setCount} />
      </div>
      <div className="container">2페이지</div>
      <div className="container">3페이지</div>
    </div>
  );
}

export default Main;
