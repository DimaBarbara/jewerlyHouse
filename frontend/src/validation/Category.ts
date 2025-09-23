import * as Yup from "yup";

export const createCategoryValidation = Yup.object({
  name: Yup.string().required("Category name is required"),

});

export const updateCategoryValidation = Yup.object({
  name: Yup.string().required("Category name is required"),
});
