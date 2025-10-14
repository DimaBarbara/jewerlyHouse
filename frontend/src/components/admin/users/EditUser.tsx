import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../redux/users/UserApi";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { updateUserValidation } from "../../../validation/User";
import Loader from "../../../pages/common/Loader";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: user, error, isLoading } = useGetUserByIdQuery(id!);

  const [updateUser] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      email: user?.email ?? "",
    },
    validationSchema: updateUserValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        await updateUser({ id: +id!, ...values }).unwrap();
        toast.success("User updated successfully!");
        resetForm();
        navigate("/admin/users");
      } catch (error) {
        console.log(error);
        toast.error("Failed to update user.");
      }
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="flex flex-col items-start !p-5">
      <div>
        <h2 className="text-2xl flex font-bold">Update user {user.id}</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col ">
            <label htmlFor="name" className=" flex items-start">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="surname" className=" flex items-start">
              Surname
            </label>
            <input
              id="surname"
              name="surname"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
              className="border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black"
            />
            {formik.touched.surname && formik.errors.surname ? (
              <div className="text-red-500">{formik.errors.surname}</div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className=" flex items-start">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="!mt-5 flex items-start">
            <button
              type="submit"
              disabled={isLoading}
              className="shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-semibold tex-xl  !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg w-[206px] h-[40px]"
            >
              {isLoading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
