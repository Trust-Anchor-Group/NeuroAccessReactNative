import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ThemeProvider } from '@src/theme/provider/ThemeContext';

const Root: React.FC = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);


AppRegistry.registerComponent(appName, () => Root);
