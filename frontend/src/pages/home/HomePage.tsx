import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Hero from "../../components/home/Hero";


const HomePage = () => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-gray-200 to-gray-300">
        <Header />
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
