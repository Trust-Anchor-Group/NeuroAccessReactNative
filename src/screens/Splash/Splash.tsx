import React from 'react';
import { View } from 'react-native';
import { Logo } from '@assets/svg/Logo';
import { colors } from '@theme/colors';
import { splashStyle } from '@styles/splashStyle';
import { BackgroundLayerC } from '@components/BackGroundLayerC';
export const Splash = () => {
  return (
    <BackgroundLayerC style={splashStyle.bgContainer}>
      <View style={splashStyle.logoContainer}>
        <Logo
          textColor={colors.light.logoPrimary}
          logoColor={colors.light.logoSecondary}
        />
      </View>
    </BackgroundLayerC>
  );
};
