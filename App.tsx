import React from 'react';
import StartupScreen from './src/navigation/StartupScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginProvider from './src/context/LoginProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Store, persistor } from '@src/services/Redux/Store';
import './src/translations'

function App(): JSX.Element {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoginProvider>
          <NavigationContainer>
            <StartupScreen />
          </NavigationContainer>
        </LoginProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
