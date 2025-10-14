import authIcon from "../../assets/svg/auth.svg";
import cartIcon from "../../assets/svg/cart.svg";
import accountIcon from "../../assets/svg/account.svg";
import heartIcon from "../../assets/svg/heart.svg";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import type React from "react";
import { useModals } from "../../hooks/useModals";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";
import Tooltip from "@mui/material/Tooltip";
import { logout } from "../../redux/auth/authSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { openLogin } = useModals();
  const isHome = pathname?.includes("/home");
  const isAuthenticated = useSelector(selectIsAuthenticated);

  function handleAuth() {
    if (isAuthenticated) {
      dispatch(logout());
      localStorage.removeItem("token");
    } else {
      openLogin();
    }
  }

  const iconEffectClasses =
    "transition duration-300 ease-in-out hover:opacity-75 focus:opacity-75";

  return (
    <header className="flex justify-between items-center relative !p-5 !pb-0">
      <Logo />
      {!isHome ? (
        <Link
          to={"/home"}
          className="font-brygada hover:underline font-normal text-xl !text-black"
        >
          Home
        </Link>
      ) : (
        ""
      )}
      <div className="flex w-[180px] lg:w-[210px] justify-between items-center">
        <div className="flex items-center">
          <Tooltip
            title={isAuthenticated ? "Favourites" : "Log in to view favourites"}
          >
            <Link to={"/account/favorites"} className={iconEffectClasses}>
              <img
                src={heartIcon}
                alt="Favourites icon"
                className="w-[20px] h-[20px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px]"
              />
            </Link>
          </Tooltip>
        </div>
        <div className="flex items-center">
          <Tooltip title="Cart">
            <Link to={"/cart"} className={iconEffectClasses}>
              <img
                src={cartIcon}
                alt="Cart icon"
                className="w-[20px] h-[20px] md:w-[22px] md:h-[22px] lg:w-[25px] lg:h-[25px]"
              />
            </Link>
          </Tooltip>
        </div>
       <div className="flex items-center font-brygada hover:underline gap-2">
          <Tooltip title={isAuthenticated ? "Account" : "Log in"}>
            {isAuthenticated ? (
              <Link
                to="/account"
                className={iconEffectClasses}
              >
                <img
                  src={accountIcon}
                  alt="Account icon"
                  className="w-[19px] h-[19px] lg:w-[22px] lg:h-[22px]"
                />
              </Link>
            ) : (
              <span
                className="flex items-center cursor-pointer gap-2"
                onClick={handleAuth}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAuth();
                }}
              >
                <img
                  src={authIcon}
                  alt="Auth icon"
                  className="w-[19px] h-[19px] lg:w-[22px] lg:h-[22px]"
                />
                <p className="font-brygada hover:underline font-normal text-base sm:text-lg lg:text-xl">
                  Log in
                </p>
              </span>
            )}
          </Tooltip>
        </div>
        <div className="flex items-center flex-col">
          <Tooltip title="Language">
            <p
              className="flex font-brygada hover:underline font-normal text-base sm:text-lg lg:text-xl cursor-pointer"
              tabIndex={0}
            >
              EN
            </p>
          </Tooltip>
          <Tooltip title="Language">
            <p
              className="flex font-brygada hover:underline font-normal text-base sm:text-lg lg:text-xl cursor-pointer"
              tabIndex={0}
            >
              UA
            </p>
          </Tooltip>
        </div>
      </div>
      <div className="absolute top-20 lg:top-22 left-1/2 min-w-6/12 border-b-1 border-black -translate-x-1/2"></div>
    </header>
  );
};

export default Header;
