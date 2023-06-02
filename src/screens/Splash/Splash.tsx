import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SplashStyle } from '@src/styles/SplashStyle';
import { BackgroundLayer } from '@src/components/BackGroundLayer';
export const Splash = () => {
  return (
    <BackgroundLayer
      logoStyle={SplashStyle.logoPosition}
      style={SplashStyle.bgContainer}
    >
      <View></View>
    </BackgroundLayer>
  );
};
