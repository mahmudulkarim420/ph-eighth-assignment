import React, { useState, useEffect } from 'react';

import TrendingApp from '../Components/TrendingApp';

const appsData = '/appsData.json';

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

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

    const results = allApps.filter((app) =>
      app.title.toLowerCase().includes(lowerCaseSearchTerm)
    );

    setFilteredApps(results);
  }, [searchTerm, allApps]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-700">Loading all apps...</p>
    );
  }

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

        <div className="w-full sm:w-auto sm:min-w-[300px]">
          <input
            type="text"
            placeholder="Search by app title or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#8453E9] focus:border-[#8453E9] transition duration-150"
          />
        </div>
      </div>

      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredApps.map((app) => (
            <TrendingApp key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-16 text-xl text-gray-500">
          No apps found matching "{searchTerm}".
        </p>
      )}
    </div>
  );
};

export default Apps;
