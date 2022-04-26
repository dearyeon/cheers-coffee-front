import styles from "./Button.module.css";
function Button({ text, color, icon = false, wide = false }) {
  const className =
    styles.wrapper +
    (color ? " " + styles[color] : "") +
    (icon ? " " + styles["icon"] : "") +
    (wide ? " " + styles["wide"] : "");
  return (
    <button className={className} size="large">
      {text}
    </button>
  );
}

export default Button;
