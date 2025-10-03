import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email required"),
  password: Yup.string().required("Password required"),
});
export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email address").required("Email required"),
  password: Yup.string().required("Password required"),
});
