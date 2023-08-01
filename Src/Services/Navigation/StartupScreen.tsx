import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthStack, ApplicationStack } from './Navigation';
import { useLogin } from './LoginProvider';
import { Splash } from '@Pages/Splash';
import { NetworkService } from '@Services/Network/NetworkService';
import { retrieveUserSession } from '@Services/Storage';
import { Constants } from '@Helpers/Constants';

export function StartupScreen() {
  const { isLoggedIn } = useLogin();
  const [appLoading, setAppLoading] = useState(true);
  const initialRoute = React.useRef('')

  useEffect(() => {
    setTimeout( async () => {
      const storedPassword = await retrieveUserSession(Constants.Authentication.PinKey);
      {storedPassword ? initialRoute.current = 'ChooseAccoutType' : 'ChooseAccoutType'}  
      setAppLoading(false);
    }, 100);
  }, [appLoading]);

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
