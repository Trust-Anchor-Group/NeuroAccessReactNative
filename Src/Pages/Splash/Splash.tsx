import React from 'react';
import { View } from 'react-native';
import { SplashStyle } from '@Pages/Styles/SplashStyle';
import { SplashBackground } from '@Controls/SplashBackground';
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
