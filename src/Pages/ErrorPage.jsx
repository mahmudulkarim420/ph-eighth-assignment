import React from 'react';
import errorImg from '../assets/error-404.png';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

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
          Oops, page not found!
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <button
          onClick={handleGoBack}
          className="bg-[#8453E9] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#6c40c7] transition duration-300 transform hover:scale-105"
        >
          Go Back!
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
