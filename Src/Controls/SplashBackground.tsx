import React, { ReactNode, useContext } from 'react';
import { View, ViewStyle } from 'react-native';
import { SplashBackgroundStyle } from '@Controls/Styles';
import { BackgroundLayerIcon, Logo } from '@Assets/Svgs';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
interface BackgroundProps {
  children: ReactNode;
  logoStyle?: ViewStyle;
  style?: ViewStyle;
}

export const SplashBackground: React.FC<BackgroundProps> = ({
  children,
  logoStyle,
  style,
}) => {
  const {themeColors}= useContext(ThemeContext);
  const styles = SplashBackgroundStyle(themeColors);
  return (
    <View style={[styles.parentContainer, logoStyle]}>
      <View style={styles.container}>
        <View style={style}>
          <BackgroundLayerIcon color={themeColors.backgroundLayer} />
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Logo
          textColor={themeColors.logoPrimary}
          logoColor={themeColors.logoSecondary}
        />
      </View>
      {children}
    </View>
  );
};
