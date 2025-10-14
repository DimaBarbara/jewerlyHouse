import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Navigation from "../../components/catalog/Navigation";
import CartList from "../../components/cart/CartList";
import CartSidebar from "../../components/cart/Sidebar";

const CartPage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="flex w-[1000px] !mx-auto">
        <CartSidebar />
        <CartList />
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
