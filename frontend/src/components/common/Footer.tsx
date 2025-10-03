import instagramIcon from "../../assets/svg/instagram.svg";
import emailIcon from "../../assets/svg/email.svg";
import QuestionForm from "./QuestionForm";

const Footer = () => {
  return (
    <footer className="!pr-50 !pl-50 !pt-10 flex justify-between !pb-5">
      <div>
        <ul className="flex flex-col gap-4 text-start">
          <li className="flex gap-2 font-brygada font-normal text-sm">
            Contacts
            <img src={emailIcon} alt="test" className="w-[24px] h-[24px] " />
            <img
              src={instagramIcon}
              alt="test"
              className="w-[24px] h-[24px] "
            />
          </li>
          <li className="font-brygada font-normal text-sm">
            Payment & Delivery
          </li>
          <li className="font-brygada font-normal text-sm">
            Return & Exchanges
          </li>
          <li className="font-brygada font-normal text-sm">Privacy Policy</li>
          <li className="font-brygada font-normal text-xs">© 2025 SZJH</li>
        </ul>
      </div>
      <div>
        <QuestionForm />
      </div>
    </footer>
  );
};

export default Footer;
