import React from 'react';
import StartupScreen from '@Services/Navigation/StartupScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginProvider from '@Services/Navigation/LoginProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Store, persistor } from '@Services/Redux/Store';
import '@Translations';

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
