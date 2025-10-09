import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { useAppInstall } from '../Context/AppInstallContext';
import Swal from 'sweetalert2';

// Icons
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
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to uninstall "${app.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, uninstall it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          uninstallApp(app.id);

          Swal.fire({
            title: 'Uninstalled!',
            text: `${app.title} has been removed successfully.`,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            if (onUninstall) onUninstall(app.id);
          });
        } catch (error) {
          console.error('Uninstall failed:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to uninstall the app.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
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
