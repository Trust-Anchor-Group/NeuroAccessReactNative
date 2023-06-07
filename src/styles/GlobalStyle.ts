import { StyleSheet } from "react-native";
import { button } from "@src/theme/Dimensions";

export const GlobalStyle=(themeColors:any) => StyleSheet.create({
  appButtonContainer: {
    height: button.height,
    backgroundColor: themeColors.button.bg,
    borderRadius: button.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: button.fontSize,
    fontFamily: 'Neue Haas Grotesk Text Pro',
    fontStyle: 'normal',
    letterSpacing: 0.1,
    color: themeColors.button.text,
    fontWeight: '700',
    alignSelf: 'center',
  },
})
