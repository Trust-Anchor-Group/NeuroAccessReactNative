import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { backGroundLayerStyle } from '@styles/backGroundLayerStyle';
import { BackgroundLayer } from '@assets/svg/BackgroundLayer';
import { colors } from '@theme/colors';

interface BackgroundProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const BackgroundLayerC: React.FC<BackgroundProps> = ({ children,style }) => {
  return (
    <View style={backGroundLayerStyle.parentContainer}>
      <View style={backGroundLayerStyle.container}>
        <View style={style}>
          <BackgroundLayer color={colors.light.backgroundLayer} />
        </View>
      </View>
      {children}
    </View>
  );
};
