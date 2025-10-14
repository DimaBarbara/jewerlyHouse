import { Link } from "react-router-dom";
import instagramIcon from "../../assets/svg/instagram.svg";
import emailIcon from "../../assets/svg/email.svg";
import QuestionForm from "./QuestionForm";

const Footer = () => {
  const iconEffectClasses =
    "transition duration-300 ease-in-out hover:opacity-75 focus:opacity-75";

  const linkClasses =
    "font-brygada font-normal text-sm relative transition-all duration-300 hover:underline underline-offset-4 !text-black";

  return (
    <footer className="lg:!pr-30 lg:!pl-20 xl:!pr-50 xl:!pl-50 !pt-10 flex flex-col gap-5 items-center sm:flex-row sm:justify-between sm:!p-5 xl:gap-0 !pb-5 relative">
      <div className="absolute top-0 left-1/2 min-w-6/12 border-b border-black -translate-x-1/2"></div>
      <div className="order-2 sm:order-0">
        <ul className="flex flex-col gap-4 text-center sm:text-start">
          <li className="flex items-center gap-3 font-brygada font-normal text-sm">
            <span>Contacts</span>
            <a
              href="mailto:info@szjh.com"
              className={iconEffectClasses}
              aria-label="Email"
            >
              <img src={emailIcon} alt="email" className="w-[24px] h-[24px]" />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={iconEffectClasses}
              aria-label="Instagram"
            >
              <img
                src={instagramIcon}
                alt="instagram"
                className="w-[24px] h-[24px]"
              />
            </a>
          </li>

          <li>
            <Link to="/delivery" className={linkClasses}>
              Payment & Delivery
            </Link>
          </li>
          <li>
            <Link to="/returns" className={linkClasses}>
              Return & Exchanges
            </Link>
          </li>
          <li>
            <Link to="/privacy" className={linkClasses}>
              Privacy Policy
            </Link>
          </li>

          <li className="font-brygada font-normal text-xs mt-2">
            © 2025 SZJH
          </li>
        </ul>
      </div>
      <div className="order-1 sm:order-0">
        <QuestionForm />
      </div>
    </footer>
  );
};

export default Footer;
