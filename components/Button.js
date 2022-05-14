import styles from "./Button.module.css";
function Button({ text }) {
  return <button className={styles.wrapper}>{text}</button>;
}

export default Button;
