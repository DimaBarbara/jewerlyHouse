import logoIcon from "../../assets/svg/logo.svg";

const Logo = () => {
  return (
    <div className="flex items-center justify-between w-[150px] lg:w-[305px]">
      <img
        src={logoIcon}
        alt="Logo icon"
        className="w-[40px] h-[40px] lg:w-[65px] lg:h-[65px]"
      />
      <div className="flex flex-col">
        <p className="font-brygada font-normal text-xs lg:text-xl xl:text-2xl mb-0">
          Sergei Zinchenko’s
        </p>
        <p className="font-brygada font-normal text-xs lg:text-xl xl:text-lg mb-0">
          – jewellery house –
        </p>
      </div>
    </div>
  );
};

export default Logo;
