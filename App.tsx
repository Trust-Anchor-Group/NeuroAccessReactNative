import React, { Component } from 'react';
import { StartupScreen, LoginProvider } from 'Services/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Store, persistor } from '@Services/Redux/Store';
import '@Translations';
import { Button, Text, View } from 'react-native';
import { TextLabel, TextLabelVariants } from '@Controls/TextLabel';

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <LoginProvider>
            <NavigationContainer>
              <StartupScreen />
            </NavigationContainer>
          </LoginProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  renderErrorView = () => {
    console.log(JSON.stringify(this.state.errorInfo.message))

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Something went wrong!
        </Text>
        <TextLabel variant={TextLabelVariants.DESCRIPTION} >{`${JSON.stringify(this.state.errorInfo.message)}`}</TextLabel>
        <Button title="Retry" onPress={this.handleRetry} />
      </View>
    );
  };

  render() {
    if (this.state.hasError) {
      return this.renderErrorView();
    }

    return this.props.children;
  }
}
