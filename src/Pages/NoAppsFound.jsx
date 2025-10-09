import React from 'react';
import errorImg from '../assets/App-Error.png';

const NoAppFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="text-center">
        <div className="mb-8">
          <img
            src={errorImg}
            alt="404 Page Not Found"
            className="w-full max-w-sm mx-auto"
          />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          OPPS!! APP NOT FOUND
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The App you are requesting is not found on our system. please try
          another apps
        </p>
      </div>
    </div>
  );
};

export default NoAppFound;
