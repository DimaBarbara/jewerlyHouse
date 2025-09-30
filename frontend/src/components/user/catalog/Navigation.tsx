import React from "react";
import navigationList, { type NavigationType } from "../../../utils/navigation";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <nav className="flex gap-20 font-brygada font-normal items-center justify-center">
      {navigationList.map((navigation: NavigationType) => (
        <NavLink
          key={navigation.name}
          to={`/catalog/${navigation.name}`}
          className={({ isActive }) =>
            `block px-4 !py-5 !pt-0 transition ${
              isActive
                ? "bg-gray-300 !text-black text-lg"
                : "!text-black text-lg 0 hover:text-white"
            }`
          }
        >
          {navigation.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
