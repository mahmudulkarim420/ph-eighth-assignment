import React from 'react';

const LoadingSpinner = ({ size = '8' }) => {
  return (
    <div className={`flex justify-center items-center py-10`}>
      <div 
        className={`w-${size} h-${size} border-4 border-t-4 border-gray-200 border-t-[#8453E9] rounded-full animate-spin`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;