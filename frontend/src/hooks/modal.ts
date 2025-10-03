import { useContext } from "react";

import type { ModalContextType } from "../models/IModal";
import { ModalContext } from "../context/ModalContext";

export const useModals = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModals must be used within a ModalProvider");
  }

  return context;
};
