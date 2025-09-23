import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAddItemMutation } from "../../../redux/items/ItemApi";
import { createItemValidation } from "../../../validation/Item";
import UploadFile from "../../../utils/UploadFile";

const AddItem = () => {
  const [addItem, { isLoading }] = useAddItemMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      image: "",
      images: "",
      material: "",
      categoryId: "",
      collectionId: "",
      isNew: "",
    },
    validationSchema: createItemValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        await addItem(values).unwrap();
        toast.success("User added successfully!");
        resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Failed to add user.");
      }
    },
  });

  return (
    <div className="flex flex-col items-start !p-5">
      <div>
        <h2 className="text-2xl flex font-bold">Add New User</h2>
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
            <label htmlFor="price" className=" flex items-start">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className="border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className=" flex items-start">
              Image
            </label>
            <UploadFile
              data={formik.values.image}
              setFieldValue={formik.setFieldValue}
            />
            {formik.touched.price && formik.errors.image ? (
              <div className="text-red-500">{formik.errors.image}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className=" flex items-start">
              Images
            </label>
            <UploadFile
              data={formik.values.images}
              setFieldValue={formik.setFieldValue}
            />
            {formik.touched.price && formik.errors.images ? (
              <div className="text-red-500">{formik.errors.images}</div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="material" className=" flex items-start">
              Material
            </label>
            <input
              id="material"
              name="material"
              type="material"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.material}
              className="border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black"
            />
            {formik.touched.material && formik.errors.material ? (
              <div className="text-red-500">{formik.errors.material}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="material" className=" flex items-start">
              Category
            </label>
            <select
              name="categories"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select a category">
                Select a collection
              </option>
              {category.map((c) => (
                <option value={c.id} label={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {formik.touched.material && formik.errors.material ? (
              <div className="text-red-500">{formik.errors.material}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="material" className=" flex items-start">
              Collection
            </label>
            <select
              name="collections"
              value={formik.values.collectionId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select a collection">
                Select a collection
              </option>
              {collection.map((c) => (
                <option value={c.id} label={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {formik.touched.material && formik.errors.material ? (
              <div className="text-red-500">{formik.errors.material}</div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="isNew" className=" flex items-start">
              Is new
            </label>
            <input
              id="isNew"
              name="isNew"
              type="isNew"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isNew}
              className="border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black"
            />
            {formik.touched.isNew && formik.errors.isNew ? (
              <div className="text-red-500">{formik.errors.isNew}</div>
            ) : null}
          </div>

          <div className="!mt-5 flex items-start">
            <button
              type="submit"
              disabled={isLoading}
              className="shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-semibold tex-xl  !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg w-[206px] h-[40px]"
            >
              {isLoading ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
