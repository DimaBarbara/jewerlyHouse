import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import ItemList from "../../components/catalog/ItemList";
import Navigation from "../../components/catalog/Navigation";
import Sidebar from "../../components/catalog/Sidebar";

const CatalogPage = () => {
  return (
    <div className="bg-white">
      <div>
        <Header />
        <Navigation />
        <div className="flex justify-between  !pt-10 gap-10">
          <Sidebar />
          <div className="flex justify-center">
            <ItemList />
          </div>
          <div className="w-[200px] min-h-screen !pr-5"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CatalogPage;
