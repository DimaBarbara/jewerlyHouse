import { useState } from "react";

export const useUpload = (uploadFn: (file: File) => Promise<string>) => {
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File) => {
    setLoading(true);
    try {
      const url = await uploadFn(file);
      setLoading(false);
      return url;
    } catch (err) {
      setLoading(false);
      console.error(err);
      return null;
    }
  };

  return { uploadFile, loading };
};
