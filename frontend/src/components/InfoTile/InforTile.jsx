import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./InfoTile.module.css";

export const InfoTile = ({ icon, title, value, bg }) => {
  return (
    <div style={{ background: bg }} className={styles.tile}>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
      </div>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};
