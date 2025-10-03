import ItemInfo from "../components/user/catalog/ItemInfo";

import Navigation from "../components/user/catalog/Navigation";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const ItemPage = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col">
        <Header />
        <Navigation />
        <div className="flex !pt-10 gap-10 items-center justify-center">
          <ItemInfo />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemPage;
