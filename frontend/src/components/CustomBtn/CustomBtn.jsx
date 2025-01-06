import styles from "./CustomBtn.module.css";

export const CustomBtn = ({ text, ...props }) => {
  return (
    <button className={styles.btn} {...props}>
      {text}
    </button>
  );
};
