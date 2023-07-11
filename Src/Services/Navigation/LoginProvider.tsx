import React, { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Loader } from '@Controls/index';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const { userDetails, loading, error } = useSelector((state) => state.user);

  const [isLoggedIn, setIsLoggedIn] = useState(userDetails?.email && userDetails?.tokenData ? true : false);
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
          value={{ isLoggedIn, setIsLoggedIn, profile, setProfile }}
        >
          {children}
        </LoginContext.Provider>
      )}
    </>
  );
};

export const useLogin = () => useContext(LoginContext);

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
