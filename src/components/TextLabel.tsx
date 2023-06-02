import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { headerSize } from '@src/theme/Dimensions';
interface CustomTextProps {
  children: ReactNode;
  variant?: 'header' | 'label' | 'inputLabel' | 'errorLabel' | 'xSmall';
  style?: TextStyle;
}

export const TextLabel: React.FC<CustomTextProps> = ({
  children,
  variant,
  style,
}) => {
  const getVariantStyle = (): TextStyle | undefined => {
    switch (variant) {
      case 'header':
        return styles.header;
      case 'label':
        return styles.label;
      case 'inputLabel':
        return styles.inputLabel;
      case 'errorLabel':
        return styles.errorLabel;
      case 'xSmall':
        return styles.xSmall;
      default:
        return undefined;
    }
  };

  return <Text style={[getVariantStyle(), style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    color: '#181F25',
  },
  label: {
    fontFamily: 'NHaasGroteskTXPro-Rg',
    fontSize: 18,
    color: '#181F25',
  },
  inputLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: '#181F25',
  },
  errorLabel: {
    fontFamily: 'NHaasGroteskTXPro-Rg',
    fontSize: 12,
    color: '#F2495C',
  },
  xSmall: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: headerSize.fontSize,
    color: '#181F25',
  },
});
