import styles from "./Button.module.css";
function Button({ text, color, icon = false, wide = false, onClick }) {
  const className =
    styles.wrapper +
    (color ? " " + styles[color] : "") +
    (icon ? " " + styles["icon"] : "") +
    (wide ? " " + styles["wide"] : "");
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
