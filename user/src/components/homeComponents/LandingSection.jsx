import React from 'react'
import im1 from '../../assets/homeimage/tshirt.webp'
import im2 from '../../assets/homeimage/card.webp'
import im4 from '../../assets/homeimage/bro.webp'
import im5 from '../../assets/homeimage/mug.webp'
import Slider from 'react-slick';

const LandingSection = () => {
      const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        fade: true,
        arrows: false,
        adaptiveHeight: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <div>
      <div className="max-w-[1600px] mt-10 mx-auto items-center flex max-sm:flex-col max-sm:items-center gap-10 p-4 justify-between text-slate-800 dark:text-slate-100">
        <div>
          <h1 className="leading-tight tracking-wider text-5xl max-w-4xl max-lg:text-4xl max-sm:text-center max-sm:text-3xl font-semibold">
            Welcome to Etsub Printing and Advertising Service
          </h1>
          <h2 className="max-w-xl tracking-wide mt-4 text-xl max-sm:text-lg max-sm:text-center">
            Transforming Your Creative Vision into Stunning Prints and Powerful
            Advertising Solutions
          </h2>
        </div>
        <div className="w-1/3 max-sm:w-2/3 max-smm:w-full shadow-2xl shadow-slate-300 dark:shadow-slate-700">
          <Slider {...settings}>
            <img
              src={im2}
              alt="tshirt"
              className="w-[200px] max-sm:h-[300px]"
            />
            <img
              src={im4}
              alt="tshirt"
              className="w-[200px] max-sm:h-[300px]"
            />
            <img
              src={im1}
              alt="tshirt"
              className="w-[200px] max-sm:h-[300px]"
            />
            <img
              src={im5}
              alt="tshirt"
              className="w-[200px] max-sm:h-[300px]"
            />
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default LandingSection
