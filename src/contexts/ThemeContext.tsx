import { createContext, useState, useEffect, ReactNode } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
}

type ThemeContextProviderProps = {
  children : ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({ children } : ThemeContextProviderProps) {

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if ((localStorage.getItem('theme') === 'dark') || (!('theme' in localStorage) 
        && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('html')?.classList.add('dark');
      setTheme('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
      setTheme('light');
    }
  }, [] );
  
  function toggleTheme() {
    if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'light') {
      localStorage.theme = 'dark';
      document.querySelector('html')?.classList.add('dark');
      setTheme('dark');
    } else {
      localStorage.theme = 'light';
      document.querySelector('html')?.classList.remove('dark');
      setTheme('light');
    }
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );

}