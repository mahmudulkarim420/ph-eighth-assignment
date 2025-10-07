import React from 'react';
import playstoreLogo from '../assets/playstore.png';
import appstoreLogo from '../assets/appstore.png';
import mainImg from '../assets/hero.png';

const Banner = () => {
  return (
    <div className="mt-[60px] md:mt-[100px] px-4">
      <div className="text-center">
        <h1 className="font-semibold text-[40px] leading-tight sm:text-[55px] md:text-[70px]">
          We Build
          <span className="text-[#8453E9] font-bold block">
            Productive Apps
          </span>
        </h1>
        <p className="max-w-[800px] mx-auto text-[#627382] mt-4 text-base md:text-lg px-2">
          At HERO.IO, we craft innovative apps designed to make everyday life
          simpler, smarter, and more exciting. Our goal is to turn your ideas
          into digital experiences that truly make an impact.
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        <a
          href="https://play.google.com/store/games?hl=en_US"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-md hover:shadow-2xl transition-shadow duration-300 text-sm md:text-base"
        >
          <img
            src={playstoreLogo}
            alt="Google Play Logo"
            className="mr-2 h-5 w-5"
          />{' '}
          Play Store
        </a>
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-md hover:shadow-2xl transition-shadow duration-300 text-sm md:text-base"
        >
          <img
            src={appstoreLogo}
            alt="App Store Logo"
            className="mr-2 h-5 w-5"
          />{' '}
          App Store
        </a>
      </div>

      <img
        className="max-w-full sm:max-w-[80%] md:max-w-[600px] mx-auto mt-10 object-contain"
        src={mainImg}
        alt="Hero product image"
      />
    </div>
  );
};

export default Banner;
