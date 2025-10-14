import Header from "../../components/common/Header";
import Sidebar from "../../components/cart/Sidebar";
import Footer from "../../components/common/Footer";
import Navigation from "../../components/catalog/Navigation";
import DeliveryList from "../../components/cart/DeliveryList";

const DeliveryPage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="flex w-[1000px] !mx-auto">
        <Sidebar />
        <DeliveryList />
      </div>
      <Footer />
    </div>
  );
};

export default DeliveryPage;
