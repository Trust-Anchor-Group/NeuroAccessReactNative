import React from 'react';
import { View } from 'react-native';
import { SplashStyle } from '@src/styles/SplashStyle';
import { SplashBackground } from '@src/components/SplashBackground';
export const Splash = () => {
  return (
    <SplashBackground
      logoStyle={SplashStyle.logoPosition}
      style={SplashStyle.bgContainer}
    >
      <View></View>
    </SplashBackground>
  );
};
