import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { logout } from "../../redux/auth/authSlice";
import accountIcon from '../../assets/svg/account.svg'
import favoritesIcon from '../../assets/svg/heart.svg'
import ordersIcon from '../../assets/svg/order.svg'
import authIcon from '../../assets/svg/auth.svg'

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const menuItems = [
    { label: "Profile", path: "/account", icon: accountIcon },
    { label: "Favorites", path: "/account/favorites", icon: favoritesIcon },
    { label: "Orders", path: "/account/orders", icon: ordersIcon },
    { label: "Log out", path: "/home", action: "logout", icon: authIcon },
  ];

  const isActive = (path: string) => {
    if (path === '/account') {
        return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('currentUser'); 
    navigate("/home"); 
  };

  return (
    <aside className="flex flex-col items-start gap-10 w-max h-max bg-gray-300 overflow-hidden !mb-5 !mt-5">
      <ul className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <li key={item.label} className="w-full">
            
            {item.action === "logout" ? (
              <div className="flex items-center !pt-2 !pb-2 !px-10  bg-transparent hover:bg-gray-400 hover:text-white">
              <img
                                src={item.icon}
                                alt="Account icon"
                                className="w-[18px] h-[18px] lg:w-[21px] lg:h-[21px]"
                              />
              <button
                onClick={handleLogout}
                className={`
                  cursor-pointer 
                  font-brygada 
                  font-semibold 
                  text-xl 
                  !px-10 
                  w-full 
                  block 
                  text-center 
                  !text-red-500
                  !no-underline
                  transition-colors duration-300 ease-in-out
                  
                `}
              >
                {item.label}
              </button>
              </div>
              
            ) : (
            <div className={` flex items-center !pt-2 !pb-2 !px-10 ${isActive(item.path) ? "bg-gray-400" : "bg-transparent hover:bg-gray-400"}`}>
               <img
                                src={item.icon}
                                alt="Account icon"
                                className="w-[19px] h-[19px] lg:w-[22px] lg:h-[22px]"
                              />
                               <Link
                to={item.path}
                className={`
                  cursor-pointer 
                  font-brygada 
                  font-semibold 
                  text-xl 
                  w-full 
                  block 
                  text-center 
                  !text-gray-800
                  !no-underline
                  transition-colors duration-300 ease-in-out
                `}
              >
                {item.label}
              </Link>
            </div>
             
            )}
            
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;