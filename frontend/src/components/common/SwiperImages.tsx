import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImagesProps {
  images: string[];
}

const SwiperImages = ({ images }: ImagesProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
       navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
      pagination={{ clickable: true }}
      loop={true}
      className={`w-[500px] h-[500px] rounded-md`}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`Image ${index + 1}`}
            className={`w-[500px] h-[500px] object-cover rounded-md`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperImages;
