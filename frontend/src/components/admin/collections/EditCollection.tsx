import { useParams } from "react-router-dom";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { updateCollectionValidation } from "../../../validation/Collection";
import Loader from "../../../pages/Loader";
import { useGetCollectionByIdQuery, useUpdateCollectionMutation } from "../../../redux/collections/CollectionApi";

const EditCollection = () => {
  const { id } = useParams<{ id: string }>();

  const { data: collection, error, isLoading } = useGetCollectionByIdQuery(id!);

  const [updateCollection] = useUpdateCollectionMutation();

  const formik = useFormik({
    initialValues: {
      name: collection?.name ?? "",
    },
    validationSchema: updateCollectionValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        await updateCollection({ id: +id!, ...values }).unwrap();
        toast.success("Collection updated successfully!");
        resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Failed to update collection.");
      }
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error</div>;
  if (!collection) return <div>Collection not found</div>;

  return (
    <div className="flex flex-col items-start !p-5">
      <div>
        <h2 className="text-2xl flex font-bold">Update Collection {collection.id}</h2>
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
          <div className="!mt-5 flex items-start">
            <button
              type="submit"
              disabled={isLoading}
              className="shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-semibold tex-xl  !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg w-[206px] h-[40px]"
            >
              {isLoading ? "Updating..." : "Update Collection"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCollection;
