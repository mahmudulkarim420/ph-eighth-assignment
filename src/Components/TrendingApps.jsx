import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrendingApp from './TrendingApp';
import LoadingSpinner from '../Pages/LoadingSpinner';

const appsData = '/appsData.json';

const TrendingApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(appsData)
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching app data:', error);
        setLoading(false);
      });
  }, []);

  const featuredApps = apps.slice(0, 8);

  const handleShowAll = () => {
    navigate('/apps');
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-700">
        <LoadingSpinner></LoadingSpinner>
      </p>
    );
  }

  if (apps.length === 0) {
    return <p className="text-center mt-20 text-gray-700">No apps found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Trending Apps
      </h2>
      <p className="text-center mt-2 text-gray-600">
        Explore All Trending Apps on the Market developed by us
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {featuredApps.map((app) => (
          <TrendingApp key={app.id} app={app} />
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={handleShowAll}
          className="bg-[#8453E9] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#6c40c7] transition duration-300 transform hover:scale-[1.05]"
        >
          Show All Apps
        </button>
      </div>
    </div>
  );
};

export default TrendingApps;
