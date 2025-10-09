import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import { FaStar, FaUsers } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
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

const convertDownloadsToNumber = (downloadsString) => {
  if (typeof downloadsString === 'number') return downloadsString;

  if (!downloadsString) return 0;

  const numericValue = parseFloat(downloadsString);
  const unit = downloadsString.slice(-1).toUpperCase();

  if (unit === 'M') {
    return numericValue * 1000000;
  } else if (unit === 'K') {
    return numericValue * 1000;
  }

  if (!isNaN(numericValue) && isFinite(numericValue)) {
    return numericValue;
  }

  return 0;
};

const formatDownloads = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

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

        if (foundApp) {
          const processedApp = {
            ...foundApp,
            downloads: convertDownloadsToNumber(foundApp.downloads),
          };

          setApp(processedApp);
        } else {
          setError('App not found!');
        }
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
      const isAppInstalled = installedApps.includes(app.id.toString());
      setIsInstalled(isAppInstalled);
    }
  }, [app, installedApps]);

  const handleInstall = () => {
    if (!app || isInstalled) return;

    installApp(app);

    setIsInstalled(true);

    toast.success(`${app.title} is now installed! Check the Installation tab.`);
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

  const formattedDownloads = formatDownloads(app.downloads);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex mb-8 items-center border-b pb-6">
        <img
          src={app.image}
          alt={app.title}
          className="w-24 h-24 rounded-2xl shadow-lg mr-6 object-cover"
        />

        <div className="ml-20">
          <h1 className="text-3xl font-bold text-gray-900">{app.title}</h1>
          <p className="text-sm text-gray-600 mb-4">
            Developed by <br />{' '}
            <span className="font-medium text-purple-600">{app.companyName}</span>
          </p>

          <div className="flex space-x-6 text-center">
            <div>
              <p className="text-xl font-bold flex items-center justify-center">
                <FiDownload className="text-purple-500 mr-1 text-base" />

                {formattedDownloads}
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
            disabled={isInstalled}
            className={`mt-4 font-bold py-2 px-6 rounded-lg text-lg transition duration-150 flex items-center ${
              isInstalled
                ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                : 'bg-[#00D390] hover:bg-[#0e7857] text-white shadow-lg'
            }`}
          >
            <FiDownload className="mr-2" />
            {isInstalled ? 'Installed' : `Install Now (${app.size} MB)`}
          </button>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
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
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-10">
          {app.description}
        </p>
      </div>
    </div>
  );
};

export default AppsDetails;
