import './swipper.scss'
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image'
import React from 'react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar'

export default function SwipperComponent({ data }: { data: { title: string, image: string }[] }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation={true}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
    >
      {data.map((ele, index) => (
        <SwiperSlide key={index}>
          <div className="slide-content">
            <Image 
              src={ele.image} 
              priority={true}  
              width={200} 
              height={200} 
              alt={ele.title} 
            />
            <p>{ele.title}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
