import React, {useContext} from 'react';
import { AppSettingsContext } from '../../../context';

export const ThemeToggler = () => {
    const {appTheme, appThemeHandler} = useContext(AppSettingsContext);

  return (
    <div id="theme-toggler">
      <label id="switch" className="switch">
        <input type="checkbox" onChange={appThemeHandler} checked={appTheme==='light'}  id="slider" />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
