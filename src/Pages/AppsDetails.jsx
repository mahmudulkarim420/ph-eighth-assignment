import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import { FaStar, FaUsers } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useAppInstall } from '../Context/AppInstallContext';

const DATA_FILE_PATH = '/appsData.json';

const AppsDetails = () => {
  const { appId } = useParams();

  const { installApp, installedApps } = useAppInstall();

  const [app, setApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const fetchAppData = async () => {
      setIsLoading(true);
      setError(null);
      setApp(null);

      try {
        const response = await fetch(DATA_FILE_PATH);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const allAppsData = await response.json();
        const foundApp = allAppsData.find((a) => a.id.toString() === appId);

        setApp(foundApp);
      } catch (e) {
        console.error('Failed to fetch app data:', e);
        setError('Failed to load app data. Please check the file path.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppData();
  }, [appId]);

  useEffect(() => {
    if (app && installedApps) {
      const isAppInstalled = installedApps.find(
        (a) => a.id.toString() === app.id.toString()
      );
      setIsInstalled(!!isAppInstalled);
    }
  }, [app, installedApps]);

  const handleInstall = () => {
    if (!app || isInstalled) return;

    installApp(app);

    setIsInstalled(true);

    alert(`${app.title} is now installed! Check the Installation tab.`);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-blue-500">
        Loading app details...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  if (!app) {
    return (
      <div className="p-8 text-center text-gray-500">
        App not found! Check the app ID in the data.
      </div>
    );
  }

  const chartData = app.ratings
    .map((r) => ({
      name: r.name,
      count: r.count,
    }))
    .reverse();

  const totalReviews = app.reviews.toLocaleString();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl">
      <div className="flex mb-8 items-center border-b pb-6">
        <img
          src={app.image || 'https://placehold.co/96x96/cccccc/333333?text=App'}
          alt={app.title}
          className="w-24 h-24 rounded-2xl shadow-lg mr-6 object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{app.title}</h1>
          <p className="text-sm text-gray-600 mb-4">
            Developed by <br />{' '}
            <span className="font-medium text-blue-600">{app.companyName}</span>
          </p>

          <div className="flex space-x-6 text-center">
            <div>
              <p className="text-xl font-bold flex items-center justify-center">
                <FiDownload className="text-blue-500 mr-1 text-base" />
                {Math.round(app.downloads / 100000) / 10}M
              </p>
              <p className="text-xs text-gray-500">Downloads</p>
            </div>

            <div className="border-l border-gray-300"></div>

            <div>
              <p className="text-xl font-bold text-yellow-600 flex items-center justify-center">
                <FaStar className="text-yellow-500 mr-1 text-base" />
                {app.ratingAvg}
              </p>
              <p className="text-xs text-gray-500">Average Rating</p>
            </div>

            <div className="border-l border-gray-300"></div>

            <div>
              <p className="text-xl font-bold flex items-center justify-center">
                <FaUsers className="text-purple-500 mr-1 text-base" />
                {totalReviews}
              </p>
              <p className="text-xs text-gray-500">Total Reviews</p>
            </div>
          </div>

          <button
            onClick={handleInstall}
            disabled={isInstalled} // Disable the button after installation
            className={`mt-4 font-bold py-2 px-6 rounded-lg text-lg transition duration-150 flex items-center ${
              isInstalled
                ? 'bg-gray-400 cursor-not-allowed text-gray-700' // Disabled styles
                : 'bg-[#00D390] hover:bg-[#0e7857] text-white shadow-lg' // Active styles
            }`}
          >
            <FiDownload className="mr-2" />
            {isInstalled ? 'Installed' : `Install Now (${app.size} MB)`}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ratings Distribution
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={(value) => value.toLocaleString()}
              />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [
                  `${value.toLocaleString()} reviews`,
                  'Count',
                ]}
              />
              <Bar dataKey="count" fill="#fb923c" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Description
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {app.description}
        </p>
      </div>
    </div>
  );
};

export default AppsDetails;
