import type { FormikErrors } from "formik";

export interface IUploadFile {
  data: { image?: File };
  setFieldValue: (
    field: string,
    value: File,
    shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<{ image?: File }>> | Promise<void>;
  errors: FormikErrors<{ image?: File }>;
}
