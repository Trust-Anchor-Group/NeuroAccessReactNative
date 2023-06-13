import { StyleSheet } from "react-native";
import { headerSize, authLabelsSize } from 'Theme/Dimensions';

export const TextLabelStyle= (themeColors:any) => StyleSheet.create({
  header: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: authLabelsSize.large,
    color: themeColors.text.primary,
  },
  label: {
    fontFamily: 'Neue Haas Grotesk Text Pro',
    fontSize: authLabelsSize.medium,
    color: themeColors.text.primary,
  },
  inputLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: authLabelsSize.label,
    color: themeColors.text.primary,
  },
  errorLabel: {
    fontFamily: 'Neue Haas Grotesk Text Pro',
    fontSize: authLabelsSize.xSmall,
    color: themeColors.text.error,
  },
  xSmall: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: headerSize.fontSize,
    color: themeColors.text.primary,
  },
});