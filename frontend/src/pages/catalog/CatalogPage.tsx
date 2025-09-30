import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import ItemList from "../../components/user/catalog/ItemList";
import Navigation from "../../components/user/catalog/Navigation";
import Sidebar from "../../components/user/catalog/Sidebar";

const CatalogPage = () => {
  return (
    <div className="bg-white">
      <div>
        <Header />
        <Navigation />
        <div className="flex !pt-10 gap-10">
          <Sidebar />
          <ItemList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CatalogPage;
