import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categoryList } from "./category";
import { SampleNextArrow, SamplePrevArrow } from "./SliderArrows";
import { useQuery } from "@tanstack/react-query";
import { getFeatures } from "../../features/dashboard/dashboardApi";
import { FeatureError, HomeFeatureSkeleton } from "../skeleton/Skeletons";
import { Link } from "react-router-dom";

const Features = () => {
    const { data: features, isLoading, isError, error } = useQuery({
      queryKey: ["features123"],
      queryFn: getFeatures,
    });
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
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

if (isLoading) {
    return <HomeFeatureSkeleton />
}
if (isError && error) {
    return <FeatureError />;
}

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-4 py-20 max-sm:py-10 mt-20 max-sm:mt-10">
      <div className="max-w-[1600px] mx-auto overflow-hidden">
        <p className="text-center text-3xl text-md:text-xl font-bold mb-2">
          Featured Products
        </p>
        <p className="text-center mb-6">New Arrivals and Best Sellers</p>
        <Slider
          {...settings}
          className="w-full z-30 group max-lg:w-full relative"
        >
          {features?.map((c, i) => (
            <Link to={`/product/${c?._id}`} className="p-4">
              <div className="shadow cursor-pointer text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center rounded-xl overflow-hidden">
                <div className="w-full flex justify-center">
                  <img className="object-cover w-full h-80" src={c.s_img} />
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold p-2">{c?.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Features;
