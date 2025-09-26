import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAddItemMutation } from "../../../redux/items/ItemApi";
import { createItemValidation } from "../../../validation/Item";
import { useGetCategoriesQuery } from "../../../redux/categories/CategoryApi";
import { useGetCollectionsQuery } from "../../../redux/collections/CollectionApi";
import { useUploadFileMutation } from "../../../redux/uploads/UploadApi";
import { useUpload } from "../../../hooks/upload";

const AddItem = () => {
  const [addItem, { isLoading: isAdding }] = useAddItemMutation();
  const [uploadMutation] = useUploadFileMutation();
  const { uploadFile } = useUpload(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadMutation(formData).unwrap();
    return res;
  });
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: collections = [] } = useGetCollectionsQuery();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      image: null,
      images: [],
      material: "",
      categoryId: "",
      collectionId: "",
      isNew: false,
    },
    validationSchema: createItemValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const itemData = {
          ...values,
          price: Number(values.price),
          categoryId: Number(values.categoryId),
          collectionId: Number(values.collectionId),
          isNew: Boolean(values.isNew),
        };
        await addItem(itemData).unwrap();
        toast.success("Item added successfully!");
        resetForm();
      } catch (error) {
        console.error("Failed to add item:", error);
        toast.error("Failed to add item.");
      }
    },
  });

  return (
    <div className="flex flex-col items-start !p-5">
      <div>
        <h2 className="text-2xl flex font-bold">Add New Item</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="flex items-start">
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
            <label htmlFor="price" className="flex items-start">
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
            <label htmlFor="image" className="flex items-start">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const url = await uploadFile(file);
                console.log(url, "url");
                if (url) {
                  formik.setFieldValue("image", url);
                }
              }}
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500">{formik.errors.image}</div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="images" className="flex items-start">
              Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={async (e) => {
                const files = e.target.files;
                if (!files) return;

                const urls: string[] = [];
                for (let i = 0; i < files.length; i++) {
                  const url = await uploadFile(files[i]);
                  if (url) urls.push(url);
                }
                console.log(urls, "urls");

                formik.setFieldValue("images", urls);
              }}
            />
            {formik.touched.images && formik.errors.images ? (
              <div className="text-red-500">{formik.errors.images}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="material" className="flex items-start">
              Material
            </label>
            <input
              id="material"
              name="material"
              type="text"
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
            <label htmlFor="categoryId" className="flex items-start">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <div className="text-red-500">{formik.errors.categoryId}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="collectionId" className="flex items-start">
              Collection
            </label>
            <select
              id="collectionId"
              name="collectionId"
              value={formik.values.collectionId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select a collection</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {formik.touched.collectionId && formik.errors.collectionId ? (
              <div className="text-red-500">{formik.errors.collectionId}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="isNew" className="flex items-start">
              Is new
            </label>
            <input
              id="isNew"
              name="isNew"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.isNew}
              className="border border-black rounded h-6 w-66 !p-4 font-brygada font-normal text-xl italic text-black"
            />
            {formik.touched.isNew && formik.errors.isNew ? (
              <div className="text-red-500">{formik.errors.isNew}</div>
            ) : null}
          </div>
          <div className="!mt-5 flex items-start">
            <button
              type="submit"
              disabled={isAdding}
              className="shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-semibold tex-xl  !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg w-[206px] h-[40px]"
            >
              {isAdding ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
