import React, { ReactNode, useContext } from 'react';
import { View, SafeAreaView, NativeModules } from 'react-native';
import { NeuroAccessBackgroundStyle } from '@src/components/styles/NeuroAccessBackgroundStyle';
import { BackgroundLayerIcon } from '@src/assets/svg/BackgroundLayerIcon';
import { ThemeContext } from '@src/theme/provider/ThemeContext';
import { NeuroStatusBar } from './NeuroStatusBar';
interface BackgroundProps {
  children: ReactNode;
}

export const NeuroAccessBackground: React.FC<BackgroundProps> = ({ children }) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = NeuroAccessBackgroundStyle(themeColors);
  
  return (
    <SafeAreaView 
    style={[styles.parentContainer]}>
      <NeuroStatusBar/>
      <View style={styles.container}>
        <BackgroundLayerIcon color={themeColors.backgroundLayer} />
      </View>
      {children}
    </SafeAreaView>
  );
};
