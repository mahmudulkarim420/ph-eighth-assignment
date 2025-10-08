import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useAppInstall } from '../Context/AppInstallContext';
const InstalledAppCard = ({ app }) => {
  const { uninstallApp } = useAppInstall();

  const handleUninstall = () => {
    if (window.confirm(`Are you sure you want to uninstall ${app.title}?`)) {
      uninstallApp(app.id);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center flex-grow">
        <div className="w-12 h-12 mr-4 flex-shrink-0">
          <img
            src={
              app.image || 'https://placehold.co/48x48/cccccc/333333?text=App'
            }
            alt={`${app.title} icon`}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-800 truncate">
            {app.title || 'App Name Not Found'}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
            <div className="flex items-center">
              <FiDownload className="text-green-500 mr-1" />
              <span>{Math.round(app.downloads / 100000) / 10}M</span>
            </div>

            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-1" />
              <span>{app.ratingAvg || 'N/A'}</span>
            </div>

            <div className="flex items-center">
              <span className="text-sm">{app.size || '0'} MB</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleUninstall}
        className="px-4 py-1.5 bg-green-500 text-white font-medium rounded-full text-sm hover:bg-green-600 transition duration-150 flex-shrink-0 shadow-md"
      >
        Uninstall
      </button>
    </div>
  );
};

export default InstalledAppCard;
