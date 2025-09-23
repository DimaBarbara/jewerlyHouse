import React from "react";
import AddButton from "./AddButton";
import { useLocation } from "react-router-dom";

const Layout: React.FC<{ children?: React.ReactNode; username?: string }> = ({
  children,
  username = "Sergey",
}) => {
  const { pathname } = useLocation();
  let isAdd = true;

  if (pathname.includes("add") || pathname.includes("edit")) {
    isAdd = false;
  }

  return (
    <div className="flex flex-col !p-5 gap-5">
      <div className="flex flex-col items-start">
        <h2 className="text-2xl font-bold font-brygada">Hello, {username}!</h2>
        <p className="text-black">Welcome to the admin dashboard</p>
      </div>
      {isAdd ? (
        <div className="flex items-start">
          <AddButton />
        </div>
      ) : null}

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
