import { Button, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ApplicationStack, AuthStack } from './Navigation';
import { useLogin } from '../context/LoginProvider';

export default function StartupScreen() {
  const { isLoggedIn } = useLogin();

  return <View style={styles.container}>
    {isLoggedIn ? <ApplicationStack /> : <AuthStack />}
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
