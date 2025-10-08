import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import InstalledAppCard from '../Components/InstalledAppCard';
import { useAppInstall } from '../Context/AppInstallContext';

const Installation = () => {
  const { installedApps } = useAppInstall();

  const [sortBy, setSortBy] = useState('Size');

  const displayApps = installedApps;
  const appCount = displayApps.length;

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Your Installed Apps
        </h1>
        <p className="text-base text-gray-500 mt-2">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-lg font-bold text-gray-700">
          {appCount} App{appCount !== 1 ? 's' : ''} Found
        </h2>

        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="Size">Size</option>
            <option value="Rating">Rating</option>
            <option value="Date">Installation Date</option>
          </select>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {appCount > 0 ? (
          displayApps.map((app) => <InstalledAppCard key={app.id} app={app} />)
        ) : (
          <div className="text-center mt-16">
            <p className="text-4xl text-gray-500 font-medium mb-4">
              No apps installed yet.
            </p>

            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Browse Trending Apps
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Installation;
