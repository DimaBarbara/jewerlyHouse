import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThreeDModelViewer from "./ThreeDModelViewer";

const Hero = () => {
  return (
    <div className="flex !p-5 relative flex-col xl:justify-between lg:flex-row">
      <motion.div
        className="flex flex-col items-center justify-center xl:!pl-30"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="font-playfair font-normal text-4xl xl:text-5xl lg:w-[415px] text-center xl:text-left xl:!mb-[44px]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          “Jewellery as accents of your individuality”
        </motion.h1>

        <Link to="/catalog/all">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-semibold tex-xl !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg w-[206px] h-[40px]"
          >
            View Catalog
          </motion.button>
        </Link>
      </motion.div>
      <motion.div
        className="overflow-hidden xl:w-[900px] xl:h-[700px] xl:!mr-40"
        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
      >
        <ThreeDModelViewer />
      </motion.div>
    </div>
  );
};

export default Hero;
