import React, { createContext, useContext, useState } from 'react';

const AppInstallContext = createContext();

export const useAppInstall = () => {
  return useContext(AppInstallContext);
};

const getInitialInstalledAppIds = () => {
  const storedIds = localStorage.getItem('installedAppIds');
  return storedIds ? JSON.parse(storedIds) : [];
};

export const AppInstallProvider = ({ children }) => {
  const [installedApps, setInstalledApps] = useState(getInitialInstalledAppIds);

  const installApp = (app) => {
    const appId = app.id.toString();
    setInstalledApps((prev) => {
      if (prev.includes(appId)) return prev;
      const newIds = [...prev, appId];
      localStorage.setItem('installedAppIds', JSON.stringify(newIds));
      return newIds;
    });
  };

  const uninstallApp = (appId) => {
    const idStr = appId.toString();
    setInstalledApps((prev) => {
      const newIds = prev.filter((id) => id !== idStr);
      localStorage.setItem('installedAppIds', JSON.stringify(newIds));
      return newIds;
    });
  };

  return (
    <AppInstallContext.Provider value={{ installedApps, installApp, uninstallApp }}>
      {children}
    </AppInstallContext.Provider>
  );
};
