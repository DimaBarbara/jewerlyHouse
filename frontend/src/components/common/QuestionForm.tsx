import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { sendFormValidation } from "../../validation/Question";
import { useSendEmailMutation } from "../../redux/form/FormApi";
import { toast } from "react-toastify";
import type { EmailCredentials, FormikHelpers } from "../../models/IEmail";

const QuestionForm = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [sendEmail] = useSendEmailMutation();

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  const handleSubmit = async (
    values: EmailCredentials,
    { resetForm }: FormikHelpers,
  ) => {
    try {
      await sendEmail(values).unwrap();
      resetForm();
      toast.success("Message sent successfully!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to send message. Try again.");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={sendFormValidation}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Field
              name="name"
              placeholder="Name"
              className="border border-black rounded h-6 w-66 !p-2 font-brygada font-normal text-sm italic text-black focus:outline-none focus:ring-1 focus:ring-black/50 transition-all duration-300"
            />
            <ErrorMessage
              name="name"
              component="div"
              className=" w-66 text-red-500 text-sm text-left !-mt-1 !ml-2 !mb-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Field
              name="email"
              placeholder="Email"
              className="border border-black rounded h-6 w-66 !p-2 font-brygada font-normal text-sm italic text-black focus:outline-none focus:ring-1 focus:ring-black/50 transition-all duration-300"
            />
            <ErrorMessage
              name="email"
              component="div"
              className=" w-66 text-red-500 text-sm text-left !-mt-1 !ml-2 !mb-1"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <Field
                as="textarea"
                name="message"
                placeholder="Write your message here"
                className="border border-black rounded h-12 w-44 !p-2 font-brygada font-normal text-sm italic text-black focus:outline-none focus:ring-1 focus:ring-black/50 transition-all duration-300 resize-none"
              />
              <ErrorMessage
                name="message"
                component="div"
                className=" w-44 text-red-500 text-sm text-left !-mt-1 !ml-2 !mb-1"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-bold text-xs w-[54px] h-12 !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg flex justify-center items-center text-center"
            >
              SEND
            </motion.button>
          </div>
          {!isAuthenticated && (
            <p className="text-[11px] text-gray-600 italic font-brygada">
              You can send questions even without an account.
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default QuestionForm;
