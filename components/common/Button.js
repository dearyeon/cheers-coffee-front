function Button({ text, className, onClick }) {
  return (
    <button className={`button-wrapper ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
