import React from 'react';

const Reviews = () => {
  return (
    <div className="bg-gradient-to-r from-[#732ded] to-[#8453E9] py-10 sm:py-16 px-4 mb-8 sm:mb-16">
      <div className="max-w-7xl mx-auto text-white text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 md:mb-16 leading-tight">
          Trusted By Millions, Built For You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 md:gap-y-0 md:gap-x-8 lg:gap-x-12">
          <div className="flex flex-col items-center p-2">
            <p className="text-lg font-semibold mb-1 sm:mb-2">
              Total Downloads
            </p>
            <p className="text-5xl sm:text-6xl font-extrabold mb-1 sm:mb-2 leading-none">
              29.6M
            </p>
            <p className="text-sm opacity-80">21% More Than Last Month</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <p className="text-lg font-semibold mb-1 sm:mb-2">Total Reviews</p>
            <p className="text-5xl sm:text-6xl font-extrabold mb-1 sm:mb-2 leading-none">
              906K
            </p>
            <p className="text-sm opacity-80">46% More Than Last Month</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <p className="text-lg font-semibold mb-1 sm:mb-2">Active Apps</p>
            <p className="text-5xl sm:text-6xl font-extrabold mb-1 sm:mb-2 leading-none">
              132+
            </p>
            <p className="text-sm opacity-80">31 More Will Launch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
