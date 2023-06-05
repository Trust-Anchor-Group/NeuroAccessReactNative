import { StyleSheet } from "react-native";
import { headerSize, authLabelsSize } from '@src/theme/Dimensions';
import { Colors } from "@src/theme/Colors";

export const TextLabelStyle = StyleSheet.create({
  header: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: authLabelsSize.large,
    color: Colors.light.primaryText,
  },
  label: {
    fontFamily: 'Neue Haas Grotesk Text Pro',
    fontSize: authLabelsSize.medium,
    color: Colors.light.primaryText,
  },
  inputLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: authLabelsSize.label,
    color: Colors.light.primaryText,
  },
  errorLabel: {
    fontFamily: 'Neue Haas Grotesk Text Pro',
    fontSize: authLabelsSize.xSmall,
    color: Colors.light.errorText,
  },
  xSmall: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: headerSize.fontSize,
    color: Colors.light.primaryText,
  },
});