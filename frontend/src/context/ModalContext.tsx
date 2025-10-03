import React, { useState, type ReactNode } from "react";

import { ModalContext } from "./ModalContext";

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const switchModals = (to: "login" | "register") => {
    if (to === "login") {
      setIsRegisterOpen(false);
      setIsLoginOpen(true);
    } else {
      setIsLoginOpen(false);
      setIsRegisterOpen(true);
    }
  };

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        openLogin,
        closeLogin,
        openRegister,
        closeRegister,
        switchModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
