import React, { useState } from "react";
import { useFormik } from "formik";
import CardCenter from "../../components/CardCenter/CardCenter";
import styles from "./UpdateKYC.module.css";
import Form from "react-bootstrap/Form";
import { CustomBtn } from "../../components/CustomBtn/CustomBtn";
import { updateKYCSchema } from "../../utils/validationSchemas";
import { postUpdateKYC } from "../../api/kyc.services";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { LogoutBtn } from "../../components/LogoutBtn/LogoutBtn";

export const UpdateKYC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      documentType: "",
      file: null,
    },
    validationSchema: updateKYCSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("documentType", values.documentType);
      formData.append("file", values.file);

      postUpdateKYC(formData)
        .then((response) => {
          toast(response?.data?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          navigate("/");
        })
        .catch((error) => {
          formik.resetForm();
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "An unknown error occurred.";
          toast(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
    },
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    formik.setFieldValue("file", selectedFile);
  };

  return (
    <CardCenter>
      <h1 className={styles.header}>KYC Update</h1>
      <p className={styles.description}>
        Upload relevant documents to complete your KYC so that we can activate
        your account as soon as possible.
      </p>

      <form onSubmit={formik.handleSubmit}>
        <Form.Select
          className={styles.select}
          aria-label="Select Document Type"
          name="documentType"
          value={formik.values.documentType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.documentType && formik.errors.documentType}
        >
          <option value="" disabled>
            Document Type
          </option>
          <option value="Emirates_ID">Emirates ID</option>
          <option value="Passport">Passport</option>
          <option value="Driving_License">Driving License</option>
          <option value="Other">Other</option>
        </Form.Select>

        {formik.touched.documentType && formik.errors.documentType && (
          <div className="text-danger">{formik.errors.documentType}</div>
        )}

        <div className={styles.fileInput}>
          <Form.Label>Upload Document (PDF only, Max 5MB)</Form.Label>
          <Form.Control
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handleFileChange}
            isInvalid={formik.touched.file && formik.errors.file}
          />
          {formik.touched.file && formik.errors.file && (
            <div className="text-danger">{formik.errors.file}</div>
          )}
        </div>

        <CustomBtn
          type="submit"
          text={formik.isSubmitting ? "Submitting..." : "Submit"}
          disabled={formik.isSubmitting || !formik.isValid}
        />
      </form>

      <LogoutBtn />
    </CardCenter>
  );
};
