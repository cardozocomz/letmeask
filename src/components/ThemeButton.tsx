import lightImg from '../assets/images/light.svg';
import darkImg from '../assets/images/dark.svg';
import '../styles/theme-button.scss';

import classnames from 'classnames'

import { useTheme } from '../hooks/useTheme';

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme();  

  return (
    <button className="theme-button-container">       
        <div 
          className={classnames(
            "button-theme",
            { isDark: (theme === 'light')  }
          )}
          onClick={toggleTheme}
        >
          { theme === 'light' ? (
            <img src={darkImg} alt="Modo claro" />
          ) : (
            <img src={lightImg} alt="Modo claro" />
          ) }
            
        </div>        
    </button>
  );
}