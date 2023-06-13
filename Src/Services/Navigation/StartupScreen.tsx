import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthStack } from './Navigation';
import { useLogin } from './LoginProvider';
import { Splash } from '@Pages/Splash';

export function StartupScreen() {
  const { isLoggedIn } = useLogin();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAppLoading(false);
    }, 1000);
  }, [appLoading]);

  if (appLoading) {
    return <Splash />
  }
  return (
    <View style={styles.container}>
      {isLoggedIn ? <AuthStack /> : <AuthStack />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
