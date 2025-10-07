import React from 'react';
import Banner from '../Components/Banner';
import Reviews from '../Components/Reviews';
import TrendingApps from '../Components/TrendingApps';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Reviews></Reviews>
      <TrendingApps></TrendingApps>
    </div>
  );
};

export default Home;