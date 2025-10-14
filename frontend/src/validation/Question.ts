import * as Yup from "yup";

export const sendFormValidation = Yup.object({
  name: Yup.string().min(2, "Too short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().min(5, "Message too short").required("Required"),
});
