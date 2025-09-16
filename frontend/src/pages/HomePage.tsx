import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
  <div>
    <div className="bg-gradient-to-b from-gray-200 to-gray-300">
       <Header/>
       <Hero/>
    </div>
    <Footer/>
  </div>
  );
  
};

export default HomePage;
