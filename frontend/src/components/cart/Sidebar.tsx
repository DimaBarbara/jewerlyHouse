import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Cart", path: "/cart" },
    { label: "Delivery", path: "/delivery" },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="flex flex-col items-start !mb-5 !mt-5">
      <ul className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <li key={item.label} className="w-full">
            <Link
              to={item.path}
              className={`
    cursor-pointer 
    font-brygada 
    font-semibold 
    text-xl 
    !pt-2 !pb-2 !px-10 
    w-full 
    block 
    text-center 
    !text-gray-800
    !no-underline
    transition-colors duration-300 ease-in-out
    ${isActive(item.path) ? "bg-gray-300" : "bg-transparent hover:bg-gray-100"}
  `}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
