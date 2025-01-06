import styles from "./CardCenter.module.css";

export default function CardCenter({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>{children}</div>
    </div>
  );
}
