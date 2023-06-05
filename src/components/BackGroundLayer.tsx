import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { BackGroundLayerStyle } from '@src/components/styles/BackGroundLayerStyle';
import { BackgroundLayerIcon } from '@src/assets/svg/BackgroundLayerIcon';
import { Colors } from '@src/theme/Colors';
import { Logo } from '@src/assets/svg/Logo';
interface BackgroundProps {
  children: ReactNode;
  logoStyle?: ViewStyle;
  style?: ViewStyle;
}

export const BackgroundLayer: React.FC<BackgroundProps> = ({
  children,
  logoStyle,
  style,
}) => {
  return (
    <View style={[BackGroundLayerStyle.parentContainer, logoStyle]}>
      <View style={BackGroundLayerStyle.container}>
        <View style={style}>
          <BackgroundLayerIcon color={Colors.light.backgroundLayer} />
        </View>
      </View>
      <View style={BackGroundLayerStyle.logoContainer}>
        <Logo
          textColor={Colors.light.logoPrimary}
          logoColor={Colors.light.logoSecondary}
        />
      </View>
      {children}
    </View>
  );
};
