import type { FunctionComponent } from "react";
import type { IUploadFile } from "../models/IUploadFile";

const UploadFile: FunctionComponent<IUploadFile> = ({
  data,
  setFieldValue,
}) => {
  return (
    <div>
      <input
        type="file"
        name="image"
        accept="image/png, .svg"
        onChange={(e) => {
          if (e.currentTarget.files) {
            setFieldValue("image", e.currentTarget.files[0]);
          }
        }}
      />
    </div>
  );
};

export default UploadFile;
