import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // SignalSense color palette
  const colors = {
    primary: '#283eae',
    secondary: '#5371e9', 
    accent: '#36c1ce',
    warning: '#f5a135',
    
    // Derived colors
    primaryLight: '#4c63d2',
    primaryDark: '#1e2d7a',
    secondaryLight: '#7b92ff',
    accentLight: '#5dd5e0',
    warningLight: '#fdb94e',
    
    // UI colors
    background: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      muted: '#94a3b8'
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      colors 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};