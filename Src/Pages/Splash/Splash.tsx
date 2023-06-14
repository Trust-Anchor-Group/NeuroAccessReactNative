import React from 'react';
import { View } from 'react-native';
import { SplashStyle } from '@Pages/Styles';
import { SplashBackground } from '@Controls/index';
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
