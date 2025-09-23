import React from "react";
import { NavLink } from "react-router-dom";
import entities, { type EntityConfig } from "./config/entities";

const Bar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-200 text-black p-4 h-screen">
      <h3 className="text-3xl font-brygada font-bold mb-4 !pt-4">
        Admin Panel
      </h3>
      <nav className="flex flex-col space-y-2">
        {entities.map((entity: EntityConfig) => (
          <NavLink
            key={entity.name}
            to={`/admin/${entity.name}`}
            className={({ isActive }) =>
              `block px-4 !py-5 transition ${
                isActive
                  ? "bg-gray-300 !text-black text-2xl"
                  : "!text-black text-2xl hover:bg-gray-300 hover:text-white"
              }`
            }
          >
            {entity.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Bar;
