import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom"; // Note: changed 'react-router/dom' to 'react-router-dom' 
import './index.css';

// 💡 NEW IMPORT: AppInstallProvider
import { AppInstallProvider } from './Context/AppInstallContext'; 

import { router } from './Routes/Route.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 💡 WRAPPING THE APP: Now, all routes have access to the context */}
    <AppInstallProvider>
      <RouterProvider router={router} />
    </AppInstallProvider>
  </StrictMode>,
);
