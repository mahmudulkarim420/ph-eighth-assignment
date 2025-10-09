import React from 'react';

import logo from '../assets/logo.png';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex items-center text-6xl font-extrabold text-gray-800">
        <span className="text-gray-900">L</span>

        <div className="mx-2">
          <img
            src={logo}
            alt="Loading logo"
            className="w-16 h-16 object-contain animate-spin"
          />
        </div>

        <span className="text-gray-900">ADING</span>
      </div>

      <p className="absolute top-1/2 mt-20 text-xl font-medium text-purple-600 animate-pulse">
        Please wait a moment...
      </p>
    </div>
  );
};

export default LoadingSpinner;
