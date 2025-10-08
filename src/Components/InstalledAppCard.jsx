import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppInstall } from '../Context/AppInstallContext';

const DownloadIcon = ({ className = 'text-blue-500 mr-1' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const StarIcon = ({ className = 'text-yellow-500 mr-1' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const formatDownloads = (num) => {
  if (typeof num !== 'number') return num;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const InstalledAppCard = ({ app, onUninstall }) => {
  const { uninstallApp } = useAppInstall();

  const handleUninstall = () => {
    uninstallApp(app.id);

    if (onUninstall) onUninstall(app.id);

    toast.success(`${app.title} has been uninstalled.`, {
      position: 'top-right',
      autoClose: 3000,
      theme: 'colored',
    });
  };

  const downloadsDisplay = formatDownloads(app.downloads);

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
      <div className="flex items-center">
        <img
          src={app.image}
          alt={app.title}
          className="w-16 h-16 rounded-xl object-cover mr-4 shadow-sm"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{app.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
            <p className="flex items-center">
              <DownloadIcon /> {downloadsDisplay}
            </p>
            <p className="flex items-center">
              <StarIcon /> {app.ratingAvg}
            </p>
            <p className="text-sm text-gray-500">{app.size} MB</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleUninstall}
        className="flex items-center text-sm font-medium text-white bg-[#00D390] hover:bg-[#0e7857] px-4 py-2 rounded-lg transition duration-150 shadow"
      >
        Uninstall
      </button>
    </div>
  );
};

export default InstalledAppCard;
