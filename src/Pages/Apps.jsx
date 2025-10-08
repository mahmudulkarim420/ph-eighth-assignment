import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import TrendingApp from '../Components/TrendingApp';
import LoadingSpinner from '../Pages/LoadingSpinner';

const appsData = '/appsData.json';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const Apps = () => {
  const [allApps, setAllApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
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

  const debouncedFilterFunction = debounce((term, apps) => {
    const lowerCaseSearchTerm = term.toLowerCase().trim();

    const results = apps.filter((app) =>
      app.title.toLowerCase().includes(lowerCaseSearchTerm)
    );

    setFilteredApps(results);

    setIsSearching(false);
  }, 400);
  // ৩. useEffect to run debounced search
  useEffect(() => {
    if (searchTerm !== '') {
      setIsSearching(true);
    } else {
      setFilteredApps(allApps);
      setIsSearching(false);
      return;
    }

    debouncedFilterFunction(searchTerm, allApps);

    return () => clearTimeout(debouncedFilterFunction._timeoutId);
  }, [searchTerm, allApps]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      {isSearching && <LoadingSpinner />}

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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#8453E9] focus:border-[#8453E9] transition duration-150"
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
        <p className="text-center mt-16 text-4xl text-gray-500">
          No apps found.
        </p>
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
