function Credit() {
  return (
    <div className="contentWrapper credit">
      <div className="credit-title">만든 사람들</div>
      <div className="row-content">
        <div className="credit-info">
          <img className="large-icon" src="../img/songinho.jpg" />
          <div className="credit-name">송인호</div>
          <div className="credit-text">블록체인 개발</div>
        </div>
        <div className="credit-info">
          <img className="large-icon" src="../img/yeonji.jpg" />
          <div className="credit-name">최연지</div>
          <div className="credit-text">웹 프론트엔드 개발</div>
        </div>
      </div>
      <div className="credit-contact">
        <div className="credit-contact-text credit-text">{contact}</div>
        <img className="mini-icon" src="../img/github.png" />
      </div>
    </div>
  );
}

const contact = `
Contact: https://github.com/cheers-coffee
`;

export default Credit;
