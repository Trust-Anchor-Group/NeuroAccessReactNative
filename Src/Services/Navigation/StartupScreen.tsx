import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { AuthStack } from './Navigation';
import { useLogin } from './LoginProvider';
import { Splash } from '@Pages/Splash';
import { TextLabel } from '@Controls/index';
import { TextLabelVariants } from '@Helpers/Enums';

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
      <InternetStatus />
      {isLoggedIn ? <AuthStack /> : <AuthStack />}
    </View>
  );
}

function InternetStatus() {
  const [isInternetReachable, setIsInternetReachable] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetReachable(state.isInternetReachable ?? false);
    });

    return () => {
      unsubscribe();
    };
  });
  return (
    <>
      {isInternetReachable === false && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            width: '100%',
            backgroundColor: '#F02525',
          }}
        >
          <TextLabel
            variant={TextLabelVariants.LABEL}
            style={{ color: 'white' }}
          >
            {isInternetReachable
              ? 'Internet Connected'
              : 'Internet Not Connected!'}
          </TextLabel>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
