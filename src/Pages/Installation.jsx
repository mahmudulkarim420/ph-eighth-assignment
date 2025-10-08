import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import InstalledAppCard from '../Components/InstalledAppCard';
import SortSelect from '../Components/SortSelect';
import { useAppInstall } from '../Context/AppInstallContext';

const DATA_FILE_PATH = '/appsData.json';

const Installation = () => {
  const { installedApps, setInstalledApps } = useAppInstall();

  const [fullInstalledApps, setFullInstalledApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('HighDownloads');

  useEffect(() => {
    const fetchFullAppData = async () => {
      setIsLoading(true);

      if (installedApps.length === 0) {
        setFullInstalledApps([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(DATA_FILE_PATH);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const allAppsData = await response.json();

        const foundApps = allAppsData.filter((app) =>
          installedApps.includes(app.id.toString())
        );

        setFullInstalledApps(foundApps);
      } catch (e) {
        console.error('Failed to load installed apps data:', e);
        setFullInstalledApps([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullAppData();
  }, [installedApps]);

  const sortedApps = [...fullInstalledApps].sort((a, b) => {
    const aDownloads = parseInt(a.downloads, 10) || 0;
    const bDownloads = parseInt(b.downloads, 10) || 0;

    if (sortBy === 'HighDownloads') return bDownloads - aDownloads;
    if (sortBy === 'LowDownloads') return aDownloads - bDownloads;
    return 0;
  });

  const displayApps = sortedApps;
  const appCount = displayApps.length;

  const handleUninstall = (id) => {
    const updatedInstalled = installedApps.filter(
      (appId) => appId !== id.toString()
    );
    localStorage.setItem('installedApps', JSON.stringify(updatedInstalled));

    // context/state update
    setInstalledApps(updatedInstalled);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 text-center">
        <p className="text-xl text-blue-500">Loading installed apps...</p>
      </div>
    );
  }

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

        <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className="max-w-4xl mx-auto">
        {appCount > 0 ? (
          displayApps.map((app) => (
            <InstalledAppCard
              key={app.id}
              app={app}
              onUninstall={handleUninstall}
            />
          ))
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
