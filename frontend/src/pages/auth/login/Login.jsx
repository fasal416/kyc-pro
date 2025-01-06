import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { loginSchema } from "../../../utils/validationSchemas";
import CardCenter from "../../../components/CardCenter/CardCenter";
import styles from "./Login.module.css";
import { CustomInput } from "../../../components/CustomInput/CustomInput";
import { Link, useNavigate } from "react-router-dom";

import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { CustomBtn } from "../../../components/CustomBtn/CustomBtn";
import { login } from "../../../store/auth/authThunks";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (values) => {
    try {
      const resultAction = await dispatch(login(values)).unwrap();
      if (resultAction) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <CardCenter>
      <h1 className={styles.header}>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput
              type="email"
              label="Email"
              name="email"
              icon={faUser}
              placeholder="Type your username"
            />
            <CustomInput
              type="password"
              label="Password"
              name="password"
              icon={faLock}
              placeholder="Type your password"
            />

            {error && <p className={styles.errors}>{error}</p>}

            <CustomBtn type="submit" text={loading ? "Loading..." : "Submit"} />

            <Link to="/register" className={styles.registerBtn}>
              Don't have an account? Register
            </Link>
          </Form>
        )}
      </Formik>
    </CardCenter>
  );
};
