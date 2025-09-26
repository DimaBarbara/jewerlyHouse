import * as Yup from "yup";

export const createItemValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.string().required("Price is required"),
  image: Yup.string().required("Image is required"),
  images: Yup.array().required("Images is required"),
  material: Yup.string().required("Material is required"),
  categoryId: Yup.number().required("Category is required"),
  collectionId: Yup.number().required("Collection is required"),
  isNew: Yup.boolean().required("Is new is required"),
});

export const updateItemValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.string().required("Price is required"),
  image: Yup.string().required("Image is required"),
  images: Yup.array().required("Images is required"),
  material: Yup.string().required("Material is required"),
  categoryId: Yup.number().required("Category is required"),
  collectionId: Yup.number().required("Collection is required"),
  isNew: Yup.boolean().required("Is new is required"),
});
