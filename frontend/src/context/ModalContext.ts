import { createContext } from "react";
import type { ModalContextType } from "../models/IModal";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
