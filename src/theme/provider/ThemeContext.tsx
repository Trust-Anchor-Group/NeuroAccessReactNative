import React, { createContext, useState } from 'react';
import { Colors } from '@src/theme/Colors';

export type ThemeType = 'light' | 'dark' | 'mobile';

export const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeColors:any,
}>({
  theme: 'light',
  setTheme: () => {},
  themeColors: 'light'
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');
  const themeColors = Colors[theme];
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
