import * as React from "react";
import Cheers from "../components/container/Cheers";
import Please from "../components/container/Please";
import Credit from "../components/container/Credit";

function Main() {
  const [count, setCount] = React.useState(1);

  return (
    <div className="wrapper">
      <Cheers count={count} setCount={setCount} />
      <Please />
      <Credit />
    </div>
  );
}

export default Main;
