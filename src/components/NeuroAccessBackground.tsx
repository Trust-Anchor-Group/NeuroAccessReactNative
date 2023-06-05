import React, { ReactNode } from 'react';
import { View, SafeAreaView } from 'react-native';
import { PlaneBackGroundStyle } from '@src/components/styles/PlaneBackGroundStyle';
import { BackgroundLayerIcon } from '@src/assets/svg/BackgroundLayerIcon';
import { Colors } from '@src/theme/Colors';
interface BackgroundProps {
  children: ReactNode;
}

export const NeuroAccessBackground: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <SafeAreaView style={[PlaneBackGroundStyle.parentContainer]}>
      <View style={PlaneBackGroundStyle.container}>
        <BackgroundLayerIcon color={Colors.light.backgroundLayer} />
      </View>
      {children}
    </SafeAreaView>
  );
};
