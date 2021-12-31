import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from '../components/organisms/Sidebar/Sidebar';
import Script from 'next/script';
import { ThemeToggler } from '../components/molecules/ThemeToggler/ThemeToggler';
import { AppSettingsContext } from '../context';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [appTheme, setAppTheme] = useState('dark');
  const appThemeHandler = useCallback(() => {
    setAppTheme(appTheme === 'dark' ? 'light' : 'dark'); 
    
  }, [appTheme]);

  useEffect(() => {
    if (appTheme === 'dark') {
    document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }

  }, [appTheme])
 
  return (
    <>
      <AppSettingsContext.Provider value={{ appTheme, appThemeHandler }}>
        <div id="app_wrapper">
          <Sidebar />
          <div id="content_wrapper" className="mt-8">
            <ThemeToggler />
            {children}
          </div>
          <Script src="/static/app.js" strategy="beforeInteractive" />
        </div>
      </AppSettingsContext.Provider>
    </>
  );
};

export default MainLayout;
