import React, { createContext, useContext, useState } from 'react';

const AppInstallContext = createContext();

const getInitialInstalledAppIds = () => {
  const storedIds = localStorage.getItem('installedAppIds');
  return storedIds ? JSON.parse(storedIds) : [];
};

export const useAppInstall = () => {
  return useContext(AppInstallContext);
};

export const AppInstallProvider = ({ children }) => {
  const [installedAppIds, setInstalledAppIds] = useState(
    getInitialInstalledAppIds
  );

  const installApp = (app) => {
    const appIdString = app.id.toString();

    setInstalledAppIds((prevIds) => {
      const isAlreadyInstalled = prevIds.includes(appIdString);
      if (isAlreadyInstalled) return prevIds;

      const newIds = [...prevIds, appIdString];
      localStorage.setItem('installedAppIds', JSON.stringify(newIds));
      return newIds;
    });
  };

  const uninstallApp = (appId) => {
    const appIdString = appId.toString();

    setInstalledAppIds((prevIds) => {
      const newIds = prevIds.filter((id) => id !== appIdString);

      localStorage.setItem('installedAppIds', JSON.stringify(newIds));

      return newIds;
    });
  };

  const value = {
    installedApps: installedAppIds,
    installApp,
    uninstallApp,
  };

  return (
    <AppInstallContext.Provider value={value}>
      {children}
    </AppInstallContext.Provider>
  );
};
