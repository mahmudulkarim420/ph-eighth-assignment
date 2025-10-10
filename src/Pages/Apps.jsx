import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import TrendingApp from '../Components/TrendingApp';
import LoadingSpinner from '../Pages/LoadingSpinner';
import NoAppFound from './NoAppsFound';

const appsData = '/appsData.json';

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
};

const Apps = () => {
  const [allApps, setAllApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(appsData)
      .then((res) => res.json())
      .then((data) => {
        setAllApps(data);
        setFilteredApps(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching app data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredApps(allApps);
    } else {
      const results = allApps.filter((app) =>
        app.title.toLowerCase().includes(term)
      );
      setFilteredApps(results);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl sm:text-3xl font-extrabold text-center">
        Our All Applications
      </h1>
      <p className="text-center text-gray-600 mt-3">
        Explore All Apps on the Market developed by us. We code for Millions
      </p>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 mt-10 gap-4">
        <p className="text-xl font-semibold text-gray-700">
          Showing <span className="text-[#8453E9]">{filteredApps.length}</span>{' '}
          of {allApps.length} Apps
        </p>

        <div className="w-full sm:w-auto sm:min-w-[300px] relative">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />

          <input
  type="text"
  placeholder="Search Apps"
  value={searchTerm}
  onChange={handleSearchChange}
  className="w-full pl-10 pr-4 py-2 border border-purple-500 rounded-lg shadow-sm focus:outline-none focus:border-purple-500 transition duration-150"
/>

        </div>
      </div>

      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredApps.map((app) => (
            <TrendingApp
              key={app.id}
              app={{ ...app, downloads: formatNumber(app.downloads) }}
            />
          ))}
        </div>
      ) : (
        
          <NoAppFound></NoAppFound>
        
      )}

      <div className="flex justify-center mt-8">
        <Link
          to="/"
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 transform hover:scale-105"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Apps;
