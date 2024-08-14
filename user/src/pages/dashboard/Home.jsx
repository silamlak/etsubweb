import React from 'react'
import CategorySlider from '../../components/homeComponents/CategorySlider'
import Features from '../../components/homeComponents/Features';
import LandingSection from '../../components/homeComponents/LandingSection';
import ScrollToTop from '../../components/ScrollToTop';
import im1 from '../../assets/homeimage/combo.webp'
import im2 from '../../assets/homeimage/brochur.webp'
import SEO from '../../components/SEO'

const Home = () => {
  return (
    <div>
      <SEO
        title="Printing and Advertising - Addis Ababa | Etsub Printing and Advertising"
        description="Etsub Printing and Advertising. We offer top-notch printing services including business cards, flyers, and t-shirt printing. Discover our services and get in touch!"
        keywords="printing services Addis Ababa, business cards, flyers, t-shirt printing, advertising"
        hr="https://etsubprinting.onrender.com/"
        image="/logo.png"
      />
      <div className="">
        <ScrollToTop />
        <LandingSection />
        <CategorySlider />
        <Features />
        <section className="bg-slate-50 mt-20 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
          <div className="gap-16 items-center p-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light sm:text-lg">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
                Your Vision, Our Craft
              </h2>
              <p className="mb-4">
                At Etsub Printing and Advertising Service, we combine creativity
                and expertise to bring your ideas to life. Whether you need
                stunning business cards, eye-catching flyers, or personalized
                t-shirts, our team delivers exceptional quality and service.
              </p>
              <p>
                Our passion for design and printing ensures that each project is
                crafted to perfection. From conceptualization to final
                production, we work closely with you to ensure your vision is
                realized with excellence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <img
                className="mt-4 w-full lg:mt-10 rounded-lg"
                src={im2}
                alt="office content 2"
              />
              <img
                className="w-full rounded-lg"
                src={im1}
                alt="office content 1"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home
