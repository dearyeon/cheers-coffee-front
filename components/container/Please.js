import { useRouter } from "next/router";
import Button from "../common/Button";
import ScrollIcon from "../common/ScrollIcon";

function Please() {
  const router = useRouter();
  return (
    <div className="contentWrapper">
      <div className="row-content">
        <img className="please-icon" src="../img/please.png" />
        <div className="please-inner">
          <div className="ment" style={{ paddingBottom: "50px" }}>
            {ment("name")}
          </div>
          <Button
            className="radius"
            text="저도 응원받고 싶은 개발자에요!"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
      <ScrollIcon />
    </div>
  );
}

const ment = (name) =>
  `이 개발자 ${name}는
당신의 커피가 간절히 필요합니다.

이 개발자의 소매에 커피을 넣어주세요.

오늘도 당신의 따뜻한 커피에
뜬 눈으로 밤을 지샐 수 있어요`;

export default Please;
