import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthStack } from './Navigation';
import { useLogin } from './LoginProvider';
import { Splash } from '@Pages/Splash';
import { NetworkService } from '@Services/Network/NetworkService';
import { Constants } from '@Helpers/Constants';
import { VerifyPin } from './VerifyPin';
import { AgentAPI } from '@Services/API/Agent';

export function StartupScreen() {
  const { isLoggedIn } = useLogin();
  const [appLoading, setAppLoading] = useState(true);
  const storedPassword = React.useRef(false);
  const initialRoute = React.useRef('')

  
  useEffect(() => {
    AgentAPI.Account.RestartActiveSession();
    const initialSetup = async () => {
      storedPassword.current = await retrieveUserSession(Constants.Authentication.PinKey); 
      initialRoute.current = storedPassword.current ? 'VerifyPin' : 'ChooseAccoutType';  
      setAppLoading(false);
    }
    setTimeout(() => {
      initialSetup();
    }, 100);
  }, [appLoading]);

  useEffect(() => {}, [storedPassword.current])

  if (!appLoading && storedPassword.current) {
    return <VerifyPin />
  }
  if (appLoading) {
    return <Splash />;
  }

  return (
    <View style={styles.container}>
      <NetworkService />
      {isLoggedIn ? <AuthStack initialRoute={initialRoute.current} /> : <AuthStack initialRoute={initialRoute.current}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
