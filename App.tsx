import React from 'react';

import StartupScreen from './src/navigation/StartupScreen';
import {NavigationContainer} from '@react-navigation/native';
import LoginProvider from './src/context/LoginProvider';

function App(): JSX.Element {
  return (
    <LoginProvider>
      <NavigationContainer>
        <StartupScreen />
      </NavigationContainer>
    </LoginProvider>
  );
}

export default App;
