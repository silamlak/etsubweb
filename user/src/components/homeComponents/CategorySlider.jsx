import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categoryList } from "./category";
import { SampleNextArrow, SamplePrevArrow } from "./SliderArrows";

const CategorySlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    adaptiveHeight: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "30px",
    responsive: [
      {
          breakpoint: 1124,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
    },
],
prevArrow: <SamplePrevArrow />,
nextArrow: <SampleNextArrow />,
};

  return (
    <div className="slider-container bg-whit mt-20 p-4 max-w-[1600px] mx-auto">
      <div className="flex max-lg:flex-col items-start justify-between gap-14 max-lg:gap-6">
        <div className="flex flex-col gap-4 text-slate-800 dark:text-slate-50">
          <p className="text-sm font-medium">All Catagories</p>
          <p className="text-3xl max-sm:2xl font-bold">Our Catagories</p>
          <p className="text font-extralight max-lg:max-w-xl">
            Specializing in design and printing on demand, good prices, high
            quality. Guaranteed customer satisfaction!
          </p>
        </div>
        <Slider
          {...settings}
          className="w-2/3 z-30 group max-lg:w-full relative"
        >
          {categoryList?.map((c, i) => (
            <div className="p-4">
              <div className="shadow text-slate-800 py-4 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 flex flex-col justify-center items-center rounded">
                <div className="w-fit flex justify-center p-4 rounded-full overflow-hidden bg-blue-200">
                  <img className="w-14 h-14" src={c.img} />
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold text-sm">{c?.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorySlider;
