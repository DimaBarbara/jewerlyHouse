import logoIcon from "../../assets/svg/logo.svg";

const Logo = () => {
  return (
    <div className="flex items-center justify-between w-[305px]">
      <img src={logoIcon} alt="i<Logo icon" />
      <div className="flex flex-col">
        <p className="font-brygada font-normal text-2xl mb-0">
          Sergei Zinchenko’s
        </p>
        <p className="font-brygada font-normal text-lg mb-0">
          – jewellery house –
        </p>
      </div>
    </div>
  );
};

export default Logo;
