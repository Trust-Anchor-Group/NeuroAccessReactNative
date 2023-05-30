import React, {createContext, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Loader from '../components/Loader';

const LoginContext = createContext();

const LoginProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appLoading, setAppLoading] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
  }, [isLoggedIn, appLoading]);
  return (
    <>
      {appLoading ? (
        <View style={styles.splashScreen}>
          <Text style={styles.appText}>Neuro Access</Text>
          <Loader loading={appLoading} />
        </View>
      ) : (
        <LoginContext.Provider
          value={{isLoggedIn, setIsLoggedIn, profile, setProfile}}>
          {children}
        </LoginContext.Provider>
      )}
    </>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appText: {
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
  },
});
