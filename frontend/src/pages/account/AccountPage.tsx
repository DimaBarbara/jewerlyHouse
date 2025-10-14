import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";

import Header from "../../components/common/Header";
import Navigation from "../../components/catalog/Navigation";
import Sidebar from "../../components/account/Sidebar";

const AccountPage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="flex justify-center gap-5">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
