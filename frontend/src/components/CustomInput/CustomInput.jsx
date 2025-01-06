import { ErrorMessage, Field } from "formik";
import styles from "./CustomInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CustomInput = ({
  type = "text",
  name,
  label,
  icon,
  placeholder,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        {icon && (
          <div className={styles.icon}>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        <Field type={type} name={name} placeholder={placeholder} />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className={styles.errorMessage}
      />
    </div>
  );
};
