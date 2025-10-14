import navigationList, { type NavigationType } from "../../utils/navigation";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <nav className="flex gap-20 font-brygada font-normal items-center justify-center !pt-3">
      {navigationList.map((navigation: NavigationType) => (
        <NavLink
          key={navigation.name}
          to={`/catalog/${navigation.name}`}
          className={({ isActive }) =>
            `block px-4 !py-5 !pt-0 transition text-lg ${
              isActive ? "!underline !text-black" : "!text-black"
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
