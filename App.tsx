import React from 'react';
import {StartupScreen, LoginProvider} from 'Services/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Store, persistor } from '@Services/Redux/Store';
import '@Translations';
import {
  setJSExceptionHandler,
} from 'react-native-exception-handler';

setJSExceptionHandler((error, isFatal) => {
  console.log("An error happened: ", error);
  handleJSErrorForSetJSExceptionHandler(error);
}, true);

export function handleJSErrorForSetJSExceptionHandler(error: any) {
  // Show error locally on DEBUG mode
    console.log("An error happened: ", error);
    // Send error to Sentry
    // const sentryId = Sentry.captureException(error);
    // Display error to the user
    // Bonus: you might also want to get more information from the user
    showErrorDialogWithFeedback(error);
}

function showErrorDialogWithFeedback(error: any, sentryId?: any) {
  throw new Error('Function not implemented.');
}

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

