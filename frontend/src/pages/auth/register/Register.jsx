import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { registerSchema } from "../../../utils/validationSchemas";

import CardCenter from "../../../components/CardCenter/CardCenter";
import styles from "./Register.module.css";
import { CustomInput } from "../../../components/CustomInput/CustomInput";
import { Link, useNavigate } from "react-router-dom";

import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { CustomBtn } from "../../../components/CustomBtn/CustomBtn";
import { register } from "../../../store/auth/authThunks";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    const { confirmPassword, ...userData } = values;
    const resultAction = dispatch(register(userData));
    if (resultAction) {
      navigate("/");
    }
  };

  return (
    <CardCenter>
      <h1 className={styles.header}>Register</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput
              type="text"
              label="Name"
              name="name"
              icon={faUser}
              placeholder="Type your username"
            />
            <CustomInput
              type="email"
              label="Email"
              name="email"
              icon={faEnvelope}
              placeholder="Type your username"
            />

            <CustomInput
              type="password"
              label="Password"
              name="password"
              icon={faLock}
              placeholder="Type your password"
            />

            <CustomInput
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              icon={faLock}
              placeholder="Confirm your password"
            />

            {error && <p className={styles.errors}>{error}</p>}

            <CustomBtn type="submit" text="Submit" />

            <Link to="/login" className={styles.registerBtn}>
              Already have an account? Login
            </Link>
          </Form>
        )}
      </Formik>
    </CardCenter>
  );
};
