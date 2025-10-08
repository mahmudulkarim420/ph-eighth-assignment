import React, { createContext, useContext, useState } from 'react';

const AppInstallContext = createContext();

export const useAppInstall = () => {
  return useContext(AppInstallContext);
};

export const AppInstallProvider = ({ children }) => {
  const [installedApps, setInstalledApps] = useState([]);

  const installApp = (appData) => {
    if (!installedApps.find((app) => app.id === appData.id)) {
      setInstalledApps((prevApps) => [...prevApps, appData]);
    }
  };

  const uninstallApp = (appId) => {
    setInstalledApps((prevApps) =>
      prevApps.filter((app) => app.id.toString() !== appId.toString())
    );
  };

  const value = {
    installedApps,
    installApp,
    uninstallApp,
  };

  return (
    <AppInstallContext.Provider value={value}>
      {children}
    </AppInstallContext.Provider>
  );
};
