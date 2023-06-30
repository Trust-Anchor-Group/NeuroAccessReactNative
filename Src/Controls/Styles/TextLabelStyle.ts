import { StyleSheet } from 'react-native';
import { moderateScale } from '@Theme/Metrics';
import { headerSize, textFontSize } from 'Theme/Dimensions';

export const TextLabelStyle = (themeColors: any) =>
  StyleSheet.create({
    header: {
      fontFamily: 'SpaceGrotesk-Bold',
      fontSize: moderateScale(28),
      color: themeColors.text.primary,
    },
    label: {
      fontFamily: 'Neue Haas Grotesk Text Pro',
      fontSize: moderateScale(15),
      color: themeColors.text.primary,
    },
    inputLabel: {
      fontFamily: 'SpaceGrotesk-Bold',
      fontSize: moderateScale(12),
      color: themeColors.text.primary,
    },
    errorLabel: {
      fontFamily: 'Neue Haas Grotesk Text Pro',
      fontSize: moderateScale(12),
      color: themeColors.text.error,
    },
    xSmall: {
      fontFamily: 'SpaceGrotesk-Medium',
      fontSize: headerSize.fontSize,
      color: themeColors.text.primary,
    },
    description: {
      fontFamily: 'Neue Haas Grotesk Text Pro',
      fontSize: textFontSize.description,
      color: themeColors.text.primary,
    },
  });
