import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppInstall } from '../Context/AppInstallContext';
import { FiDownload } from 'react-icons/fi';

const DownloadIcon = ({ className = 'text-purple-500 mr-1' }) => (
  <FiDownload className={className} />
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
      autoClose: 2000,
      style: {
        background: '#00D390',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '8px',
        fontSize: '14px',
        padding: '10px 14px',
      },
      progressStyle: {
        background: '#ffffff',
      },
      icon: '✅',
    });
  };

  const downloadsDisplay = formatDownloads(app.downloads);

  return (
    <>
      {/* ✅ Toast Container with NO external CSS */}
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
    </>
  );
};

export default InstalledAppCard;
