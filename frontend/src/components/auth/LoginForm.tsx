import { useFormik } from "formik";
import { LoginSchema } from "../../validation/Auth";
import { useLoginMutation } from "../../redux/auth/AuthApi";
import { toast } from "react-toastify";
import { useModals } from "../../hooks/useModals";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice";

const LoginForm: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { isLoginOpen, switchModals, closeLogin } = useModals();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await login(values).unwrap();
        dispatch(setCredentials({ token: response.token }));
         if (response.user) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
        toast.success("Login successful");
        setSubmitting(false);
        closeLogin();
      } catch (error) {
        console.log(error);
        toast.error("Login failed");
      }
    },
  });
  if (!isLoginOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(217, 217, 217, 0.8)" }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white w-[600px] h-[700px] rounded-4xl flex flex-col justify-between !p-13 shadow-2xl relative"
      >
        <button
          type="button"
          onClick={closeLogin}
          className="absolute top-5 right-5 p-2 text-black/50 hover:text-black transition-colors duration-200"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col justify-center items-center pt-8">
          <h2 className="text-4xl text-black font-playfair font-bold !mb-12">
            Log In
          </h2>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="!mb-5 w-[400px] h-[40px] rounded-md border border-black/20 
               shadow-md bg-white !px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl !p-2"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className=" w-[400px] text-red-500 text-sm text-left !-mt-4 !ml-2 !mb-1">
              {formik.errors.email}
            </div>
          ) : null}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="!mb-6 w-[400px] h-[40px] rounded-md border border-black/20 
               shadow-md bg-white !px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl !p-2"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className=" w-[400px] text-red-500 text-sm text-left !-mt-4 !ml-2 !mb-1">
              {formik.errors.password}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center justify-center !mb-2.5 font-brygada text-2xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] 
                        text-white font-semibold !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg w-[206px] h-[40px] transition duration-300
                        ${
                          formik.isSubmitting
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] hover:opacity-90"
                        }`}
          >
            {formik.isSubmitting ? "Logging In..." : "Log In"}
          </button>

          <p className="font-normal text-base text-black font-brygada">
            Forgot password?
            <span className="!ml-1 underline font-normal text-base text-black font-brygada cursor-pointer">
              Reset here
            </span>
          </p>
        </div>

        <div className="!pb-4 ">
          <p className="font-normal text-base text-black font-brygada text-center">
            Do not have an account?
            <span
              onClick={() => switchModals("register")}
              className="!ml-1 underline font-normal text-base text-black font-brygada cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
