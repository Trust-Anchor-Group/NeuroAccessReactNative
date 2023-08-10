import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AuthStack } from './Navigation';
import { useLogin } from './LoginProvider';
import { Splash } from '@Pages/Splash';
import { NetworkService } from '@Services/Network/NetworkService';
import { clearLocalStorage, retrieveUserSession } from '@Services/Storage';
import { Constants } from '@Helpers/Constants';
import { isEmpty } from '@Helpers/Utility/Utils';
import LoginScreen from '@Pages/Registration/LoginUser1';
import TestLogin from '../../Pages/Registration/TestLogin'
import { VerifyPin } from './VerifyPin';

export function StartupScreen() {
  const { isLoggedIn } = useLogin();
  const [appLoading, setAppLoading] = useState(true);
  const hasPin = React.useRef(false);
  const initialRoute = React.useRef('')

  
  useEffect(() => {
    const initialSetup = async () => {
      const storedPassword = await retrieveUserSession(Constants.Authentication.PinKey); 
      initialRoute.current = !isEmpty(storedPassword) ? 'VerifyPin' : 'ChooseAccoutType';  
      hasPin.current = !isEmpty(storedPassword)
      setAppLoading(false);
    }
    setTimeout(() => {
      initialSetup();
    }, 100);
  }, [appLoading]);

  useEffect(() => {}, [hasPin])

  if (!appLoading && hasPin.current) {
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
