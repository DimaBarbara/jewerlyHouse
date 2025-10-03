import authIcon from "../../assets/svg/auth.svg";
import cartIcon from "../../assets/svg/cart.svg";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import type React from "react";
import { useModals } from "../../hooks/modal";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { openLogin } = useModals();
  const isHome = pathname?.includes("/home");
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
      <div className="flex w-[210px] justify-between items-center">
        <div className="flex items-center">
          <Link to={"/cart"}>
            <img src={cartIcon} alt="Cart icon" className="w-[25px] h-[25px]" />
          </Link>
        </div>
        <div className="flex items-center font-brygada hover:underline gap-2">
          <img src={authIcon} alt=" Auth icon" className="w-[22px] h-[22px]" />
          <p
            onClick={openLogin}
            className="flex font-brygada hover:underline font-normal text-xl"
          >
            Log in
          </p>
        </div>
        <div className="flex items-center flex-col">
          <p className="flex font-brygada hover:underline font-normal text-xl ">
            EN
          </p>
          <p className="flex font-brygada hover:underline font-normal text-xl">
            UA
          </p>
        </div>
      </div>
      <div className="absolute top-20 left-1/2 w-[1000px] border-b-1 border-black -translate-x-1/2"></div>
    </header>
  );
};

export default Header;
