import * as Yup from "yup";

export const createCollectionValidation = Yup.object({
  name: Yup.string().required("Collection name is required"),

});

export const updateCollectionValidation = Yup.object({
  name: Yup.string().required("Collection name is required"),
});