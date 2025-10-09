import React from 'react';

const SortSelect = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm text-gray-600">
        Sort By:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
      >
        <option value="HighDownloads">High Downloads</option>
        <option value="LowDownloads">Low Downloads</option>
      </select>
    </div>
  );
};

export default SortSelect;
