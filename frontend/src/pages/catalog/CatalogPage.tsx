import ItemList from "../../components/catalog/ItemList";
import Navigation from "../../components/catalog/Navigation";
import Sidebar from "../../components/catalog/Sidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
