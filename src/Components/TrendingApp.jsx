import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TrendingApp = ({ app }) => {
  return (
    <Link 
      to={`/app/${app.id}`} 
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.03] no-underline"
    >
      <div className="w-full h-50 bg-white flex items-center justify-center text-gray-500 text-sm overflow-hidden">
        <img
          src={app.image}
          alt={app.title}
          className="max-w-[150px] max-h-[150px] object-cover p-2 rounded-2xl"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 truncate">
          {app.title}
        </h3>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            <FiDownload className="mr-1" />
            <span>{app.downloads}</span> 
          </div>

          <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
            <span className="mr-1">⭐</span>
            <span>{app.ratingAvg}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingApp;