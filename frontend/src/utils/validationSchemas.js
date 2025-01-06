import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const updateKYCSchema = Yup.object({
  documentType: Yup.string().required("Document type is required"),
  file: Yup.mixed()
    .required("File is required")
    .test("fileFormat", "Only PDF files are allowed", (value) => {
      return value && value.type === "application/pdf";
    })
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 5 * 1024 * 1024;
    }),
});
