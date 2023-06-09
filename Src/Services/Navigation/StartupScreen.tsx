import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthStack, ApplicationStack } from './Navigation';
import { useLogin } from './LoginProvider';
import { Splash } from '@Pages/Splash';
import { NetworkService } from '@Services/Network/NetworkService';

export function StartupScreen() {
  const { isLoggedIn } = useLogin();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAppLoading(false);
    }, 1000);
  }, [appLoading]);

  if (appLoading) {
    return <Splash />;
  }
  return (
    <View style={styles.container}>
      <NetworkService />
      {isLoggedIn ? <ApplicationStack /> : <AuthStack />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
